import { ContractRepositoryInterface } from '@domain/repositories/contract'
import { ContractInterface } from '@domain/models/contract'
import Contract from '@database/models/contract'
import {Op, TransactionOptions} from 'sequelize'
import { profileIdClause } from '@database/repositories/common'

export class ContractRepository implements ContractRepositoryInterface {
    private readonly STATUSES = {
        TERMINATED: 'terminated',
        IN_PROGRESS: 'in_progress'
    }

    async findOne(id: number, profileId: number, databaseTransactionConfig?: TransactionOptions): Promise<ContractInterface> {
        return await Contract.findOne({
            where: {
                id,
                ...profileIdClause(profileId)
            },
            ...databaseTransactionConfig
        })
    }

    async findNonTerminated(profileId: number): Promise<ContractInterface[]> {
        return await Contract.findAll({
            where: {
                ...profileIdClause(profileId),
                status: {
                    [Op.not]: this.STATUSES.TERMINATED,
                },
            },
        })
    }

    async findInProgress(profileId: number): Promise<ContractInterface[]> {
        return await Contract.findAll({
            where: {
                ...profileIdClause(profileId),
                status: this.STATUSES.IN_PROGRESS
            },
        })
    }

    async findInProgressFromClients(profileId: number): Promise<ContractInterface[]> {
        return await Contract.findAll({
            where: {
                status: this.STATUSES.IN_PROGRESS,
                ClientId: profileId,
            }
        })
    }

    async findOneById(id: number, databaseTransactionConfig?: any): Promise<ContractInterface> {
        return await Contract.findOne({
            where: { id },
            ...databaseTransactionConfig
        })
    }
}
