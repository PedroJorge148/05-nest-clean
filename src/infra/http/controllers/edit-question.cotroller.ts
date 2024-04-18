import { EditQuestionUseCase } from '@/domain/forum/app/use-cases/edit-question'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'

const EditQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type EditQuestionBodySchema = z.infer<typeof EditQuestionBodySchema>

const bodyValidationPipe = new ZodValidationPipe(EditQuestionBodySchema)

@Controller('/questions/:id')
export class EditQuestionController {
  constructor(private EditQuestion: EditQuestionUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditQuestionBodySchema,
    @Param('id') questionId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body
    const { sub: userId } = user

    const result = await this.EditQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: [], // TODO: Edit attachments
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
