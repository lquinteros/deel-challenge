import {ENUM, Model, TEXT} from 'sequelize'
import sequelize from '@database/setup'
import Profile from '@database/models/profile'
import Job from '@database/models/job'
import {ContractInterface} from '@domain/models/contract'

class Contract extends Model implements ContractInterface {
    declare id: number
    declare ClientId: number
    declare ContractorId: number
    declare terms: string
    declare status: string

    static buildAssociations() {
        Contract.belongsTo(Profile, { as: 'Contractor' })
        Contract.belongsTo(Profile, { as: 'Client' })
        Contract.hasMany(Job)
    }
}

Contract.init(
    {
        terms: {
            type: TEXT,
            allowNull: false
        },
        status: {
            type: ENUM('new', 'in_progress', 'terminated')
        }
    },
    {
        sequelize,
        modelName: 'Contract'
    }
)

export default Contract
