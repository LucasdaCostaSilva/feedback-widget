import { FeedbacksRepository } from "../repositories/FeedbacksRepository";
import { IFeedback } from "../types/IFeedback.type";

export class FeedbackService {

  constructor(private feedbacksRepository: FeedbacksRepository) { }

  async execute(feedback: IFeedback) {
    const { type, comment, screenshot } = feedback
    const feedbacksRepository = this.feedbacksRepository
    return await feedbacksRepository.create({ type, comment, screenshot })
  }
}