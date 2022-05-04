import express from 'express';
import { EmailAdapterImpl } from './adapters/nodemailer/EmailAdapterImpl';
import { FeedbacksRepositoryImpl } from './repositories/prisma/FeedbacksRepositoryImpl';
import { FeedbackService } from './services/FeedbackService';

export const routes = express.Router()



routes.get('/', (req, res) => {
  res.send('Usar rota: /feedbacks com método POST')
})

routes.post('/feedbacks', async (req, res) => {

  const { type, comment, screenshot } = req.body;

  try {
    const emailAdapter = new EmailAdapterImpl()
    const feedbacksRepository = new FeedbacksRepositoryImpl()

    const feedbackService = new FeedbackService(feedbacksRepository, emailAdapter)
    const feedbackSaved = await feedbackService.execute({ type, comment, screenshot })
    res.status(201).send({ data: feedbackSaved })
  } catch (error) {
    res.status(500).send('Feedback não salvo: ' + error)
  }

})
