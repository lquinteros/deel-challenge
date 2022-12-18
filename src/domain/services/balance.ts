import {ContractRepositoryInterface} from "@domain/repositories/contract"
import {LoggerInterface} from "@domain/helpers/logger"
import {ContractInterface} from "@domain/models/contract"
import {JobRepositoryInterface} from "@domain/repositories/job"
import {ProfileInterface} from "@domain/models/profile"
import sequelize from "@database/setup"
import {Transaction} from "sequelize"
import Profile from "@database/models/profile"
import {ProfileRepositoryInterface} from "@domain/repositories/profile";

export class BalanceService {
    private readonly contractRepository: ContractRepositoryInterface
    private readonly logger: LoggerInterface
    private readonly jobRepository: JobRepositoryInterface
    private readonly profileRepository: ProfileRepositoryInterface
    private readonly DEPOSIT_LIMIT_GAP = 0.25

    constructor(
        contractRepository: ContractRepositoryInterface,
        jobRepository: JobRepositoryInterface,
        profileRepository: ProfileRepositoryInterface,
        logger: LoggerInterface
    ) {
        this.contractRepository = contractRepository
        this.jobRepository = jobRepository
        this.profileRepository = profileRepository
        this.logger = logger
    }

    // TODO create interface for response
    // TODO error handling
    async deposit(profile: ProfileInterface, userId: number, amount: number): Promise<any> {
        // TODO What if the profile.id is the same than userId? Is it a valid case?

        if(profile.type !== 'client') {
            // TODO review this logic, should a contractor be able to make deposits?
            this.logger.error(`A contractor is not able to make deposits. Profile id ${profile.id}`)
            return
        }

        this.logger.log(`Depositing ${amount} for profile ${profile.id}`)

        try {
            // Getting debt with clients
            const inProgressContractsFromClients = await this.contractRepository.findInProgressFromClients(profile.id)
            const contractIds = inProgressContractsFromClients.map((contract: ContractInterface) => contract.id)
            const debt = await this.jobRepository.getDebtFromContracts(contractIds)

            this.assertValidDepositLimit(amount, debt)

            const balance = await sequelize.transaction(async (t: Transaction) => {
                const options = { transaction: t, lock: t.LOCK.UPDATE }
                // Making deposit
                return await this.profileRepository.increaseBalance(userId, amount, options)
            })
            this.logger.log(`The new balance for profile ${profile.id} is ${balance}`)
            return balance
        } catch (error) {
            this.logger.error(`Error when trying to deposit: ${error.message}`)
            throw error
        }
    }

    private assertValidDepositLimit(amount: number, debt: number) {
        this.logger.log(`Validating deposit amount limit: ${amount} versus debt: ${debt}`)
        const depositLimit = this.DEPOSIT_LIMIT_GAP * debt
        if (amount > depositLimit) throw new Error(`Deposit limit exceeded. Max deposit is ${depositLimit}`)
    }
}