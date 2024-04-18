import { DeleteQuestionUseCase } from '@/domain/forum/app/use-cases/delete-question'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

@Controller('/questions/:id')
export class DeleteQuestionController {
  constructor(private DeleteQuestion: DeleteQuestionUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Param('id') questionId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const { sub: userId } = user

    const result = await this.DeleteQuestion.execute({
      questionId,
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
