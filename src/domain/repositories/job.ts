import {JobInterface} from '@domain/models/job'

export interface JobRepositoryInterface {
    findOne(id, databaseTransactionConfig?: any): Promise<JobInterface>
    findUnpaid(contractIds: number[]): Promise<JobInterface[]>
    pay(id: number, databaseTransactionConfig?: any): Promise<JobInterface>
    getDebtFromContracts(contractIds: number[]): Promise<any> // TODO create interface for response
}