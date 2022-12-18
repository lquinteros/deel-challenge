export interface JobInterface {
    id: number
    ContractId: number
    price: number
    paid: boolean
    paymentDate: Date
    createdAt: Date
    updatedAt: Date
}