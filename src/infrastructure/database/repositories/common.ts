import { Op } from "sequelize"

const profileIdClause: (profileId) => {} = profileId => ({[Op.or]: [{ClientId: profileId}, {ContractorId: profileId}]})

export { profileIdClause }