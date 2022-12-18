import {ContractRepositoryInterface} from '@domain/repositories/contract'
import {ContractInterface} from '@domain/models/contract'
import {LoggerInterface} from '@domain/helpers/logger'

export class ContractService {
    private readonly repository: ContractRepositoryInterface
    private readonly logger: LoggerInterface

    constructor(
        repository: ContractRepositoryInterface,
        logger: LoggerInterface
    ) {
        this.repository = repository
        this.logger = logger
    }

    // TODO error handling
    async findOne(id: number, profileId: number): Promise<ContractInterface> {
        try {
            this.logger.log(`Finding contract ${id}`)
            return await this.repository.findOne(id, profileId)
        } catch (e) {
            this.logger.error(`Error when trying to find contract ${id}. Message: ${e.message}`)
            throw e
        }
    }

    // TODO error handling
    async findNonTerminated(profileId: number): Promise<ContractInterface[]> {
        try {
            this.logger.log(`Finding non terminated contracts for profile ${profileId}`)
            return await this.repository.findNonTerminated(profileId)
        } catch (e) {
            this.logger.error(`Error when trying to find non terminated contracts. Message: ${e.message}`)
            throw e
        }
    }
}
