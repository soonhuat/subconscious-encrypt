import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import http from 'http'
import indexRouter from './routes/encryptRoute'
import { connectRedis } from './connections/redis'
import { connectSocket } from './connections/socket'

dotenv.config()
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use('/', indexRouter)
const server = http.createServer(app)

connectRedis()
connectSocket(server)

app.listen(port, () => {
  console.log(`RBAC app listening at http://localhost:${port}`)
})
