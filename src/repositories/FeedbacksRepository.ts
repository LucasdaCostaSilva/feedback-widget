import { IFeedback } from "../types/IFeedback.type";

export interface FeedbacksRepository {
  create: (feedback: IFeedback) => Promise<IFeedback>;
}
