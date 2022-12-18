import {JobRepositoryInterface} from "@domain/repositories/job"
import {LoggerInterface} from "@domain/helpers/logger"
import {ProfileRepositoryInterface} from "@domain/repositories/profile"
import {ContractRepositoryInterface} from "@domain/repositories/contract"
import {JobInterface} from "@domain/models/job"
import {ContractInterface} from "@domain/models/contract"
import sequelize from "@database/setup"
import {Transaction} from "sequelize"

export class JobService {
    private readonly jobRepository: JobRepositoryInterface
    private readonly profileRepository: ProfileRepositoryInterface
    private readonly contractRepository: ContractRepositoryInterface
    private readonly logger: LoggerInterface

    constructor(
        jobRepository: JobRepositoryInterface,
        profileRepository: ProfileRepositoryInterface,
        contractRepository: ContractRepositoryInterface,
        logger: LoggerInterface
    ) {
        this.jobRepository = jobRepository
        this.profileRepository = profileRepository
        this.contractRepository = contractRepository
        this.logger = logger
    }

    // TODO error handling
    async findUnpaid(profileId: number): Promise<JobInterface[]> {
        try {
            this.logger.log(`Finding unpaid jobs for profile ${profileId}`)
            const contracts = await this.contractRepository.findInProgress(profileId)
            const contractIds = contracts.map((contract: ContractInterface) => contract.id)
            return this.jobRepository.findUnpaid(contractIds)
        } catch (e) {
            this.logger.error(`Error when trying to find unpaid jobs. Message: ${e.message}`)
            throw e
        }
    }

    // TODO Create an interface for this response
    // TODO error handling
    async pay(jobId: number, profileId: number): Promise<any> {
        this.logger.log(`Paying to profile ${profileId} for the job ${jobId}`)

        try {
            return await sequelize.transaction(async (t: Transaction) => {
                const options = {transaction: t, lock: t.LOCK.UPDATE}
                const job = await this.jobRepository.findOne(jobId, options)

                if (!job) {
                    this.logger.log(`Job id ${jobId} not found`)
                    return false
                }

                const contract = await this.contractRepository.findOneById(job.ContractId, options)

                if (!job) {
                    this.logger.log(`Contract id ${job.ContractId} not found for job ${jobId}`)
                    return false
                }

                const client = await this.profileRepository.findOne(contract.ClientId, options)
                const contractor = await this.profileRepository.findOne(contract.ContractorId, options)

                if(!client) throw new Error('Unknown client')
                if(!contractor) throw new Error('Unknown contractor')
                if(client.balance < job.price) throw Error('Insufficient balance to pay this job')

                await this.jobRepository.pay(jobId, options)
                await this.profileRepository.decreaseBalance(client.id, job.price, options)
                return await this.profileRepository.increaseBalance(contractor.id, job.price, options)
            })
        } catch (e) {
            this.logger.error(`Error when trying to pay job ${jobId}`)
            throw e
        }
    }
}