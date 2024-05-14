import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { OnAnswerCreated } from '@/domain/notification/app/subscribers/on-answer-created'
import { OnQuestionBestAnswerChosen } from '@/domain/notification/app/subscribers/on-question-best-answer-chosen'
import { SendNotificationUseCase } from '@/domain/notification/app/use-cases/send-notification'

@Module({
  imports: [DatabaseModule],
  providers: [
    OnAnswerCreated,
    OnQuestionBestAnswerChosen,
    SendNotificationUseCase,
  ],
})
export class EventsModule {}
