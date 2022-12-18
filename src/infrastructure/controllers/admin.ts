import {AdminService} from "@domain/services/admin"
import buildResponse from "@infrastructure/helpers/response"

export class AdminController {
    private readonly DEFAULT_LIMIT = 2
    private readonly service: AdminService

    constructor(service: AdminService) {
        this.service = service
    }

    async findBestProfession(req, res): Promise<any> {
        try {
            const start = String(req.query.start)
            const end = String(req.query.end)

            const bestProfessions = await this.service.findBestProfession(start, end)
            buildResponse(bestProfessions, res)
        } catch (e) {
            // TODO make better error responses
            res.status(500).send(e.message)
        }
    }

    async findBestClients(req, res): Promise<any> {
        try {
            const start = String(req.query.start)
            const end = String(req.query.end)
            const limit = Number(req.query.limit || this.DEFAULT_LIMIT)
            const bestClients = await this.service.findBestClients(start, end, limit)
            buildResponse(bestClients, res)
        } catch (e) {
            // TODO make better error responses
            res.status(500).send(e.message)
        }
    }
}