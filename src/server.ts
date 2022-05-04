import express from 'express'
import { prisma } from './prisma'
import nodemailer from 'nodemailer'

const app = express()

app.use(express.json())

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a03c03b4489ce9",
    pass: "12be122b4944ad"
  }
});

app.get('/', (req, res) => {
  res.send('Usar rota: /feedbacks com método POST')
})

app.post('/feedbacks', async (req, res) => {

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
    const feedbackSaved = await prisma.feedback.create({
      data: {
        type, comment, screenshot
      },
    })
    res.status(201).send({ data: feedbackSaved, emailErro })
  } catch (error) {
    res.status(500).send('Feedback não salvo: ' + error + '  Email erro' + emailErro)
  }

})

app.listen(3333, () => {
  console.log('Server started on port 3333!')
})
