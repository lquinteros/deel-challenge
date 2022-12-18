import {ProfileRepositoryInterface} from "@domain/repositories/profile"
import {ProfileInterface} from "@domain/models/profile"
import {TransactionOptions} from "sequelize"
import Profile from "@database/models/profile"

export class ProfileRepository implements ProfileRepositoryInterface {
    async findOne(id: number, databaseTransactionConfig?: TransactionOptions): Promise<ProfileInterface> {
        return await Profile.findByPk(id, { ...databaseTransactionConfig })
    }

    async decreaseBalance(id: number, amount: number, databaseTransactionConfig?: any): Promise<ProfileInterface> {
        await Profile.decrement('balance', { where: { id }, by: amount, ...databaseTransactionConfig })
        return this.getBalance(id, databaseTransactionConfig)
    }

    async increaseBalance(id: number, amount: number, databaseTransactionConfig?: any): Promise<ProfileInterface> {
        await Profile.increment('balance', { where: { id }, by: amount, ...databaseTransactionConfig })
        return this.getBalance(id, databaseTransactionConfig)
    }

    private async getBalance(id: number, databaseTransactionConfig?: any): Promise<ProfileInterface> {
        return await Profile.findByPk(id, { attributes: ['balance'], ...databaseTransactionConfig})
    }
}