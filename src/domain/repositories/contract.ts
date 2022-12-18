import { ContractInterface } from '@domain/models/contract'

export interface ContractRepositoryInterface {
    findOne(id: number, profileId: number): Promise<ContractInterface>
    findOneById(id: number,  databaseTransactionConfig?: any): Promise<ContractInterface>
    findNonTerminated(profileId: number): Promise<ContractInterface[]>
    findInProgress(profileId: number): Promise<ContractInterface[]>
    findInProgressFromClients(profileId: number): Promise<ContractInterface[]>
}
