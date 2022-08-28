import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import indexRouter from './routes/encryptRoute'
import { connectRedis } from './connections/redis'

dotenv.config()
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use('/', indexRouter)
connectRedis()

app.listen(port, () => {
  console.log(`RBAC app listening at http://localhost:${port}`)
})
