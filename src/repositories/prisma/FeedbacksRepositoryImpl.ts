import { prisma } from "../../prisma";
import { IFeedback } from "../../types/IFeedback.type";
import { FeedbacksRepository } from "../FeedbacksRepository";

export class FeedbacksRepositoryImpl implements FeedbacksRepository {
  async create({ type, comment, screenshot }: IFeedback) {
    const feedbackSaved = await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot
      },
    })
    // return feedbackSaved without id
    const { id, ...feedbackWithoutId } = feedbackSaved
    return feedbackWithoutId
  }
}
