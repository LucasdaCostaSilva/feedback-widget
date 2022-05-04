import express from 'express';
import nodemailer from 'nodemailer';
import { FeedbacksRepositoryImpl } from './repositories/prisma/FeedbacksRepositoryImpl';
import { FeedbackService } from './services/FeedbackService';

export const routes = express.Router()

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a03c03b4489ce9",
    pass: "12be122b4944ad"
  }
});

routes.get('/', (req, res) => {
  res.send('Usar rota: /feedbacks com método POST')
})

routes.post('/feedbacks', async (req, res) => {

  const { type, comment, screenshot } = req.body;
  let emailErro = "";
  try {
    await transport.sendMail({
      from: "Equipe feedback <suporte@feedget.com>",
      to: "Lucas <landir@gmail.com>",
      subject: "Feedback do usuário",
      html: [
        `<div style="font-family: sans-serif; font-size: 16px;color: #111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `<p>Tela:<br/> <img src="${screenshot}" alt="Tela" /></p>`,
        `</div>`
      ].join('\n')
    })
  } catch (error) {
    emailErro = 'Email não enviado: ' + error
  }

  try {
    const feedbacksRepository = new FeedbacksRepositoryImpl()
    const feedbackService = new FeedbackService(feedbacksRepository)
    const feedbackSaved = await feedbackService.execute({ type, comment, screenshot })
    res.status(201).send({ data: feedbackSaved, emailErro })
  } catch (error) {
    res.status(500).send('Feedback não salvo: ' + error + '  Email erro' + emailErro)
  }

})
