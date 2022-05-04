export interface IFeedback {
  type: string;
  comment: string;
  screenshot: string | null;
  updatedAt?: Date;
}
