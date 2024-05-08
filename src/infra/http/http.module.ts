import { Module } from '@nestjs/common'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'

import { AuthenticateStudentUseCase } from '@/domain/forum/app/use-cases/authenticate-student'
import { CreateQuestionUseCase } from '@/domain/forum/app/use-cases/create-question'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/app/use-cases/fetch-recent-questions'
import { RegisterStudentUseCase } from '@/domain/forum/app/use-cases/register-student'
import { GetQuestionBySlugUseCase } from '@/domain/forum/app/use-cases/get-question-by-slug'
import { EditQuestionUseCase } from '@/domain/forum/app/use-cases/edit-question'
import { DeleteQuestionUseCase } from '@/domain/forum/app/use-cases/delete-question'
import { AnswerQuestionUseCase } from '@/domain/forum/app/use-cases/answer-question'
import { EditAnswerUseCase } from '@/domain/forum/app/use-cases/edit-answer'
import { DeleteAnswerUseCase } from '@/domain/forum/app/use-cases/delete-answer'
import { FetchQuestionAnswersUseCase } from '@/domain/forum/app/use-cases/fetch-question-answers'

import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { AnswerQuestionController } from './controllers/answer-question.controller'
import { EditAnswerController } from './controllers/edit-answer.controller'
import { DeleteAnswerController } from './controllers/delete-answer.controller'
import { EditQuestionController } from './controllers/edit-question.controller'
import { FetchQuestionAnswersController } from './controllers/fetch-question-answers.controller'
import { ChooseQuestionBestAnswerController } from './controllers/choose-question-best-answer.controller'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/app/use-cases/choose-question-best-answer'

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
  ],
})
export class HttpModule {}
