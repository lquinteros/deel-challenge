import {ContractService} from '@domain/services/contract'
import buildResponse from "@infrastructure/helpers/response"

export class ContractController {
    private readonly service: ContractService

    constructor(service: ContractService) {
        this.service = service
    }

    async findOne(req, res) {
        try {
            const id = Number(req.params.id)
            const profile = req.app.get('profile')
            const contract = await this.service.findOne(id, profile.id)
            buildResponse(contract, res)
        } catch (e) {
            // TODO make better error responses
            res.status(500).send(e.message)
        }
    }

    async findNonTerminated(req, res) {
        try {
            const profile = req.app.get('profile')
            const contracts = await this.service.findNonTerminated(profile.id)
            buildResponse(contracts, res)
        } catch (e) {
            // TODO make better error responses
            res.status(500).send(e.message)
        }
    }
}