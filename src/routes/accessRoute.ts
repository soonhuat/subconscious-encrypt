import express, { Request, Response } from 'express'
import encryptController from '../controllers/encryptController'

const router = express.Router()

router.post('/encrpyt', function (req: Request, res: Response) {
  encryptController(req.body, res)
})

export default router
