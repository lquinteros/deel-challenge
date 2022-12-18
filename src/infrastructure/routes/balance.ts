import { Router } from 'express'
import { balanceController } from "@infrastructure/dependency-injection-setup"

const router = Router()

router.post('/deposit/:userId', async (req, res) => { await balanceController.deposit(req, res) })

export default router
