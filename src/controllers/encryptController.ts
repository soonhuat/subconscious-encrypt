import { Response } from 'express'
import { reqBody } from '../@types/types'
import { redisClient } from '../connections/redis'
import * as crypto from 'crypto'
import { io } from '../connections/socket'

export async function encrypt(body: reqBody, res: Response) {
  const nonce = await redisClient.get('nonce')
  await redisClient.set('nonce', nonce + 1)

  const input = body.input
  const inputString = JSON.stringify(input)
  const hashInput = inputString + nonce

  // respond with nonce so client get the result later
  let responded = false
  const responseTimeout = setTimeout(() => {
    res.send({ result: null, nonce })
    responded = true
  }, 5000)

  const result = crypto.createHash('sha256').update(hashInput).digest('hex')
  await redisClient.set(`result-${nonce}`, result)
  const response = { result, nonce }

  io.emit(`encrypt result-${nonce}`, response)
  !responded && res.send(response)

  clearTimeout(responseTimeout)
  return
}

export async function getEncryptResult(nonce: string, res: Response) {
  const result = await redisClient.get(`result-${nonce}`)
  res.send({ result, nonce })
  return
}
