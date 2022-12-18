import {JobService} from "@domain/services/job"
import buildResponse from "@infrastructure/helpers/response"

export class JobController {
    private readonly service: JobService

    constructor(service: JobService) {
        this.service = service
    }

    async findUnpaid(req, res) {
        try {
            const profile = req.app.get('profile')
            const jobs = await this.service.findUnpaid(profile.id)
            buildResponse(jobs, res)
        } catch (e) {
            // TODO make better error responses
            res.status(500).send(e.message)
        }
    }

    async pay(req, res) {
        try {
            const profile = req.app.get("profile")
            const jobId = Number(req.params.job_id)
            const data = await this.service.pay(jobId, profile.id)
            buildResponse(data, res)
        } catch (e) {
            // TODO make better error responses
            res.status(500).send(e.message)
        }
    }
}