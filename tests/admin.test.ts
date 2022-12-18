import { contractService, contractRepository, logger } from "@infrastructure/dependency-injection-setup"

describe("Contract service", () => {
    describe("Find contracts", async () => {
        it("Should return false in case it doesn't find contracts", async () => {
            jest.spyOn(contractRepository, "findNonTerminated").mockReturnValue(Promise.resolve(null))
            jest.spyOn(logger, "log").mockReturnValue(null)
            const result = await contractService.findNonTerminated(1);
            expect(result).toBeFalsy();
        })
    })
})