import express from 'express'
import { prisma } from './prisma'
import nodemailer from 'nodemailer'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Usar rota: /feedbacks com método POST')
})

app.post('/feedbacks', (req, res) => {
  prisma.feedback.create({
    data: {
      ...req.body,
    },
  }).then(feedback => {
    res.status(201).send({ data: feedback })
  }).catch(err => {
    res.status(500).send('Feedback erro' + err)
  })

})

app.listen(3333, () => {
  console.log('Server started on port 3333!')
})
