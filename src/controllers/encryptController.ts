import { Response } from 'express'
import { reqBody } from '../@types/types'
import { redisClient } from '../connections/redis'
import * as crypto from 'crypto'

async function encryptController(body: reqBody, res: Response) {
  const input = body.input
  const nonce = await redisClient.get('nonce')
  const hashInput = input + nonce
  const result = crypto
    .createHash('sha256')
    .update(hashInput)
    .digest()
    .toString('hex')
  await redisClient.set('nonce', nonce + 1)
  res.send({ result, nonce })
}

export default encryptController
