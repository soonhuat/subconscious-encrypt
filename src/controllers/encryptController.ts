import { Response } from 'express'
import { reqBody } from '../@types/types'

async function encryptController(body: reqBody, res: Response) {
  const input = body.input
  if (!input) {
    res.send(false)
    return
  }
  res.send(false)
}

export default encryptController
