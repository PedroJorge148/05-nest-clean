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

import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller'
import { EditQuestionController } from './controllers/edit-question.cotroller'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { AnswerQuestionController } from './controllers/answer-question.controller'

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
  ],
})
export class HttpModule {}
