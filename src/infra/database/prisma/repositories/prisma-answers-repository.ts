import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerAttachmentsRepository } from '@/domain/forum/app/repositories/answer-attachments-repository'
import { AnswersRepository } from '@/domain/forum/app/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Injectable } from '@nestjs/common'
import { PrismaAnswerMapper } from '../mappers/prisma-answer-mapper'
import { PrismaService } from '../prisma.service'
import { AnswerDetails } from '@/domain/forum/enterprise/entities/value-objects/answer-details'
import { PrismaAnswerDetailsMapper } from '../mappers/prisma-answer-details-mapper'

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  constructor(
    private prisma: PrismaService,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async create(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer)

    await this.prisma.answer.create({
      data,
    })

    await this.answerAttachmentsRepository.createMany(
      answer.attachments.getItems(),
    )
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = await this.prisma.answer.findUnique({
      where: {
        id,
      },
    })

    if (!answer) {
      return null
    }

    return PrismaAnswerMapper.toDomain(answer)
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answers = await this.prisma.answer.findMany({
      where: {
        questionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return answers.map(PrismaAnswerMapper.toDomain)
  }

  async findManyByQuestionIdWithAuthor(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<AnswerDetails[]> {
    const answers = await this.prisma.answer.findMany({
      where: {
        questionId,
      },
      include: {
        author: true,
        attachments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return answers.map(PrismaAnswerDetailsMapper.toDomain)
  }

  async save(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer)

    await Promise.all([
      this.prisma.answer.update({
        where: {
          id: data.id,
        },
        data,
      }),
      this.answerAttachmentsRepository.createMany(
        answer.attachments.getNewItems(),
      ),
      this.answerAttachmentsRepository.deleteMany(
        answer.attachments.getRemovedItems(),
      ),
    ])
  }

  async delete(answer: Answer): Promise<void> {
    await this.prisma.answer.delete({
      where: {
        id: answer.id.toString(),
      },
    })
  }
}
