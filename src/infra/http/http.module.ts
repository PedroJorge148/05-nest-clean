import { Module } from '@nestjs/common'

import { AuthenticateStudentUseCase } from '@/domain/forum/app/use-cases/authenticate-student'
import { CreateQuestionUseCase } from '@/domain/forum/app/use-cases/create-question'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/app/use-cases/fetch-recent-questions'
import { RegisterStudentUseCase } from '@/domain/forum/app/use-cases/register-student'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
  ],
})
export class HttpModule {}
