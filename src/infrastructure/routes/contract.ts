import { Router } from 'express'
import { contractController } from "@infrastructure/dependency-injection-setup"

const router = Router()

router.get('/:id', async (req, res) => { await contractController.findOne(req, res) })
router.get('/', async (req, res) => { await contractController.findNonTerminated(req, res) })

export default router
