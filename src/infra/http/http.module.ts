import { Module } from '@nestjs/common'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'

import { AnswerQuestionUseCase } from '@/domain/forum/app/use-cases/answer-question'
import { AuthenticateStudentUseCase } from '@/domain/forum/app/use-cases/authenticate-student'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/app/use-cases/choose-question-best-answer'
import { CommentOnAnswerUseCase } from '@/domain/forum/app/use-cases/comment-on-answer'
import { CommentOnQuestionUseCase } from '@/domain/forum/app/use-cases/comment-on-question'
import { CreateQuestionUseCase } from '@/domain/forum/app/use-cases/create-question'
import { DeleteAnswerUseCase } from '@/domain/forum/app/use-cases/delete-answer'
import { DeleteQuestionUseCase } from '@/domain/forum/app/use-cases/delete-question'
import { DeleteQuestionCommentUseCase } from '@/domain/forum/app/use-cases/delete-question-comment'
import { EditAnswerUseCase } from '@/domain/forum/app/use-cases/edit-answer'
import { EditQuestionUseCase } from '@/domain/forum/app/use-cases/edit-question'
import { FetchQuestionAnswersUseCase } from '@/domain/forum/app/use-cases/fetch-question-answers'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/app/use-cases/fetch-recent-questions'
import { GetQuestionBySlugUseCase } from '@/domain/forum/app/use-cases/get-question-by-slug'
import { RegisterStudentUseCase } from '@/domain/forum/app/use-cases/register-student'
import { DeleteAnswerCommentUseCase } from '@/domain/forum/app/use-cases/delete-answer-comment'

import { AnswerQuestionController } from './controllers/answer-question.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { ChooseQuestionBestAnswerController } from './controllers/choose-question-best-answer.controller'
import { CommentOnAnswerController } from './controllers/comment-on-answer.controller'
import { CommentOnQuestionController } from './controllers/comment-on-question.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { DeleteAnswerCommentController } from './controllers/delete-answer-comment.controller'
import { DeleteAnswerController } from './controllers/delete-answer.controller'
import { DeleteQuestionCommentController } from './controllers/delete-question-comment.controller'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { EditAnswerController } from './controllers/edit-answer.controller'
import { EditQuestionController } from './controllers/edit-question.controller'
import { FetchQuestionAnswersController } from './controllers/fetch-question-answers.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    FetchQuestionAnswersController,
    ChooseQuestionBestAnswerController,
    CommentOnQuestionController,
    DeleteQuestionCommentController,
    CommentOnAnswerController,
    DeleteAnswerCommentController,
  ],
  providers: [
    CreateQuestionUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    FetchRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionBySlugUseCase,
    AnswerQuestionUseCase,
    EditAnswerUseCase,
    DeleteAnswerUseCase,
    FetchQuestionAnswersUseCase,
    ChooseQuestionBestAnswerUseCase,
    CommentOnQuestionUseCase,
    DeleteQuestionCommentUseCase,
    CommentOnAnswerUseCase,
    DeleteAnswerCommentUseCase,
  ],
})
export class HttpModule {}
