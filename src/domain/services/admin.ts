import {AdminRepositoryInterface} from "@domain/repositories/admin"
import {LoggerInterface} from "@domain/helpers/logger"

export class AdminService {

    private readonly repository: AdminRepositoryInterface
    private readonly logger: LoggerInterface
    private readonly DEFAULT_LIMIT = 2
    constructor(
        repository: AdminRepositoryInterface,
        logger: LoggerInterface
    ) {
        this.repository = repository
        this.logger = logger
    }

    // TODO Create interface for response { profession: 'example name', profit: 1000 }
    // TODO error handling
    async findBestProfession(start: string, end: string): Promise<any> {
        try {
            this.logger.log(`Finding best profession for the date range from ${start} to ${end}`)
            return await this.repository.findBestProfession(start, end)
        } catch (e) {
            this.logger.error(`Error when trying to find best profession. Message: ${e.message}`)
            throw e
        }
    }

    // TODO Create interface for response { 'id': 1, 'fullName': 'Reece Moyer', 'paid' : 100.3 }
    // TODO error handling
    async findBestClients(start: string, end: string, limit = this.DEFAULT_LIMIT): Promise<any> {
        try {
            this.logger.log(`Finding best clients for the date range from ${start} to ${end}`)
            return await this.repository.findBestClients(start, end, limit)
        } catch (e) {
            this.logger.error(`Error when trying to find best clients. Message: ${e.message}`)
            throw e
        }
    }
}
