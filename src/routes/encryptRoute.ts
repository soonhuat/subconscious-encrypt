import express, { Request, Response } from 'express'
import { encrypt, getEncryptResult } from '../controllers/encryptController'

const router = express.Router()

router.post('/encrypt', function (req: Request, res: Response) {
  encrypt(req.body, res)
})

router.get('/encrypt/result/:nonce', function (req: Request, res: Response) {
  getEncryptResult(req.params.nonce, res)
})

export default router
