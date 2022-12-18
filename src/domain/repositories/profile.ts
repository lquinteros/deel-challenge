import {ProfileInterface} from "@domain/models/profile"

export interface ProfileRepositoryInterface {
    findOne(id: number, databaseTransactionConfig?: any): Promise<ProfileInterface>
    increaseBalance(id: number, amount: number, databaseTransactionConfig?: any): Promise<any> // TODO create interface
    decreaseBalance(id: number, amount: number, databaseTransactionConfig?: any): Promise<any> // TODO create interface
}