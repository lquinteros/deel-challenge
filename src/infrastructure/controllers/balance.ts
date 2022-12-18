import {BalanceService} from "@domain/services/balance"
import buildResponse from "@infrastructure/helpers/response"

export class BalanceController {
    private readonly service: BalanceService

    constructor(service: BalanceService) {
        this.service = service
    }

    // TODO create interface for response
    async deposit(req, res): Promise<any> {
        try {
            const profile = req.app.get('profile')

            if (profile.type !== 'client') {
                // TODO review this logic, should a contractor be able to make deposits?
                res.status(401).send('A contractor is not able to make deposits')
            }

            const userId = Number(req.params.userId)
            const amount = Number(req.body.amount)
            const response = await this.service.deposit(profile, userId, amount)
            buildResponse(response, res)
        } catch (e) {
            // TODO make better error responses
            res.status(500).send(e.message)
        }
    }
}