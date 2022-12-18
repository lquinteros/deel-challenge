import Profile from '@database/models/profile'
import Contract from '@database/models/contract'
import Job from '@database/models/job'

const models = [ Profile, Contract, Job ]

const buildAssociations = () => {
    models.forEach(model => {
        if(model.buildAssociations) {
            model.buildAssociations()
        }
    })
}

export default buildAssociations
