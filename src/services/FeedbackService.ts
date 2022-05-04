import { EmailAdapter } from "../adapters/EmailAdapter";
import { FeedbacksRepository } from "../repositories/FeedbacksRepository";
import { IFeedback } from "../types/IFeedback.type";

export class FeedbackService {

  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private emailAdapter: EmailAdapter,
  ) { }

  async execute(feedback: IFeedback) {
    const { type, comment, screenshot } = feedback

    await this.emailAdapter.sendEmail({
      subject: 'Feedback do usuário',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px;color: #111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot && `<p>Tela:<br/> <img src="${screenshot}" alt="Tela" /></p>`,
        `</div>`
      ].join('\n')
    })

    return await this.feedbacksRepository.create({ type, comment, screenshot })
  }
}