import express from 'express'
import { routes } from './rotas'
import cors from 'cors'

const PORT = process.env.PORT || 3333
const app = express()

app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(routes)

app.listen(PORT, () => {
  console.log('Server started on port ${PORT}!')
})
