import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { AttachmentPresenter } from './attachment-presenter'

export class QuestionDetailsPresenter {
  static toHTTP(questionDetails: QuestionDetails) {
    return {
      questionId: questionDetails.questionId.toString(),
      authorId: questionDetails.authorId,
      author: questionDetails.author,
      title: questionDetails.title,
      content: questionDetails.content,
      slug: questionDetails.slug.value,
      attachments: questionDetails.attachments.map(AttachmentPresenter.toHTTP),
      bestAnswerId: questionDetails.bestAnswerId,
      createdAt: questionDetails.createdAt,
      updatedAt: questionDetails.updatedAt,
    }
  }
}
