import { Router } from 'express'
import { jobController } from "@infrastructure/dependency-injection-setup"

const router = Router()

router.get('/unpaid', async (req, res) => { await jobController.findUnpaid(req, res) })
router.post('/:job_id/pay', async (req, res) => { await jobController.pay(req, res) })

export default router
