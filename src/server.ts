import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.header('location', 'http://localhost:3333/feedback')
  res.status(302).send('Hello World!')
})

app.get('/feedback', (req, res) => {
  res.send('Feedback received' + JSON.stringify(req.body))
})

app.listen(3333, () => {
  console.log('Server started on port 3333!')
})
