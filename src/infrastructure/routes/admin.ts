import { Router } from 'express'
import { adminController } from "@infrastructure/dependency-injection-setup"

const router = Router()

router.get('/best-clients', async (req, res) => { await adminController.findBestClients(req, res) })
router.get('/best-profession', async (req, res) => { await adminController.findBestProfession(req, res) })

export default router
