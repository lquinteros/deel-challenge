import {JobRepositoryInterface} from "@domain/repositories/job"
import {JobInterface} from "@domain/models/job"
import Job from "@database/models/job"
import {Op, TransactionOptions} from "sequelize"

export class JobRepository implements JobRepositoryInterface {

    async findUnpaid(contractIds: number[]): Promise<JobInterface[]> {
        return await Job.findAll({
            where: {
                ContractId: {
                    [Op.in]: contractIds,
                },
                paid: false,
            },
        })
    }

    // TODO create interface for response
    async pay(id: number, databaseTransactionConfig?: any): Promise<JobInterface> {
        const result = await Job.update(
            { paid: true },
            { where: { id }, returning: true, ...databaseTransactionConfig }
        )
        return
    }

    // TODO create interface for response
    async getDebtFromContracts(contractIds: number[]): Promise<any> {
        return await Job.sum("price", {
            where: {
                ContractId: {
                    [Op.in]: contractIds,
                },
                paid: false,
            }
        })
    }

    async findOne(id, databaseTransactionConfig?: TransactionOptions): Promise<JobInterface> {
        return await Job.findByPk(id, { ...databaseTransactionConfig })
    }
}
