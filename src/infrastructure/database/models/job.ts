import {BOOLEAN, DATE, DECIMAL, Model, TEXT} from 'sequelize'
import sequelize from '@database/setup'
import Contract from '@database/models/contract'

class Job extends Model {
    declare id: number
    declare ContractId: number
    declare price: number
    declare paid: boolean
    declare paymentDate: Date
    declare createdAt: Date
    declare updatedAt: Date

    static buildAssociations() {
        Job.belongsTo(Contract)
    }
}

Job.init(
    {
        description: {
            type: TEXT,
            allowNull: false
        },
        price: {
            type: DECIMAL(12, 2),
            allowNull: false
        },
        paid: {
            type: BOOLEAN,
            defaultValue: false
        },
        paymentDate: {
            type: DATE
        }
    },
    {
        sequelize,
        modelName: 'Job'
    }
)

export default Job