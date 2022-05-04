import { IFeedback } from "../types/IFeedback.type"
import { FeedbackService } from "./FeedbackService"

const updatedAt = new Date()
const feedbackService = new FeedbackService(
  { create: async (data) => Promise.resolve({ updatedAt, ...data }) },
  { sendEmail: async () => { } }
)

describe('Submit Feedback ', () => {
  it('should be able to submit feedback', async () => {
    await expect(feedbackService.execute({
      type: 'bug',
      comment: 'teste comment',
    } as IFeedback)).resolves.toEqual({
      type: 'bug',
      comment: 'teste comment',
      updatedAt
    })
  })

  it('should be able to submit feedback with screenshot', async () => {
    await expect(feedbackService.execute({
      type: 'bug',
      comment: 'teste comment',
      screenshot: 'data:image/png;base64,teste'
    } as IFeedback)).resolves.toEqual({
      type: 'bug',
      comment: 'teste comment',
      screenshot: 'data:image/png;base64,teste',
      updatedAt
    })
  })

  it('should NOT be able to submit feedback with screenshot invalid format', async () => {
    await expect(feedbackService.execute({
      type: 'bug',
      comment: 'teste comment',
      screenshot: 'data screenshot'
    } as IFeedback)).rejects.toThrowError('Invalid screenshot format')
  })

  it('should NOT be able to submit feedback without type', async () => {
    await expect(feedbackService.execute({
      comment: 'teste comment',
    } as IFeedback)).rejects.toThrowError('Type is required')
  })

  it('should NOT be able to submit feedback without comment', async () => {
    await expect(feedbackService.execute({
      type: 'teste type',
    } as IFeedback)).rejects.toThrowError('Comment is required')
  })

})
