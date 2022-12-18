import { DECIMAL, ENUM, Model, STRING } from 'sequelize'
import sequelize from '@database/setup'
import Contract from '@database/models/contract'

class Profile extends Model {
    declare id: number
    declare firstName: string
    declare lastName: string
    declare profession: string
    declare balance: number
    declare type: string
    declare createdAt: Date
    declare updatedAt: Date

    static buildAssociations() {
        Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' })
        Profile.hasMany(Contract, {
            as: 'Contractor',
            foreignKey: 'ContractorId',
        })
    }
}

Profile.init(
    {
        firstName: {
            type: STRING,
            allowNull: false
        },
        lastName: {
            type: STRING,
            allowNull: false
        },
        profession: {
            type: STRING,
            allowNull: false
        },
        balance: {
            type: DECIMAL(12, 2)
        },
        type: {
            type: ENUM('client', 'contractor')
        }
    },
    {
        sequelize,
        modelName: 'Profile'
    }
)

export default Profile