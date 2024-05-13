import request from 'supertest'

import { Test } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { INestApplication } from '@nestjs/common'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'
import { AnswerFactory } from 'test/factories/make-answer'
import { AnswerAttachmentFactory } from 'test/factories/make-answer-attachment'
import { AttachmentFactory } from 'test/factories/make-attachment'

describe('Fetch question answers (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory
  let answerAttachmentFactory: AnswerAttachmentFactory
  let attachmentFactory: AttachmentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AnswerFactory,
        AnswerAttachmentFactory,
        AttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    answerAttachmentFactory = moduleRef.get(AnswerAttachmentFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /questions/:questionId/answers', async () => {
    const user = await studentFactory.makePrismaStudent({
      name: 'John Doe',
    })

    const token = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const attachment = await attachmentFactory.makePrismaAttachment({
      title: 'Some attachment',
    })

    const answer = await answerFactory.makePrismaAnswer({
      authorId: user.id,
      questionId: question.id,
      content: 'Answer 01',
    })

    await answerFactory.makePrismaAnswer({
      authorId: user.id,
      questionId: question.id,
      content: 'Answer 02',
    })

    await answerAttachmentFactory.makePrismaAnswerAttachment({
      attachmentId: attachment.id,
      answerId: answer.id,
    })

    const questionId = question.id.toString()

    const response = await request(app.getHttpServer())
      .get(`/questions/${questionId}/answers`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)

    expect(response.body).toEqual({
      answers: expect.arrayContaining([
        expect.objectContaining({
          content: 'Answer 01',
          author: 'John Doe',
          attachments: [
            expect.objectContaining({
              title: 'Some attachment',
            }),
          ],
        }),
        expect.objectContaining({
          content: 'Answer 02',
          author: 'John Doe',
          attachments: [],
        }),
      ]),
    })
  })
})
