import {AdminRepositoryInterface} from "@domain/repositories/admin"
import sequelize from "@database/setup"
import {QueryTypes} from "sequelize"

export class AdminRepository implements AdminRepositoryInterface {
    private readonly DEFAULT_LIMIT = 2
    async findBestClients(start: string, end: string, limit = this.DEFAULT_LIMIT): Promise<any> {
        return await sequelize.query(
        `
                SELECT "ClientId", SUM("price") AS "totalPaid"
                FROM "Jobs"
                INNER JOIN "Contracts" ON "Jobs"."ContractId" = "Contracts"."id"
                INNER JOIN "Profiles" ON "Contracts"."ClientId" = "Profiles"."id"
                WHERE "Jobs"."paid" = true
                AND "Jobs"."paymentDate" BETWEEN :start AND :end
                GROUP BY "ClientId"
                ORDER BY "totalPaid" DESC
                LIMIT :limit
            `,
    {
                replacements: { start, end, limit },
                type: QueryTypes.SELECT,
            }
        )

    }

    async findBestProfession(start: string, end: string): Promise<any> {
        console.log(start, end)
        const profession = await sequelize.query(
        `
                SELECT "profession", SUM("price") AS "totalPaid"
                FROM "Jobs"
                INNER JOIN "Contracts" ON "Jobs"."ContractId" = "Contracts"."id"
                INNER JOIN "Profiles" ON "Contracts"."ContractorId" = "Profiles"."id"
                WHERE "Jobs"."paid" = true
                AND "Jobs"."paymentDate" BETWEEN :start AND :end
                GROUP BY "profession"
                ORDER BY "totalPaid" DESC
                LIMIT 1
            `,
    {
                replacements: { start, end },
                type: QueryTypes.SELECT,
            }
        )
        return profession[0]
    }

}