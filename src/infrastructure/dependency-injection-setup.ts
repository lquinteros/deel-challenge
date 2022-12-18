import {LoggerHelper} from "@infrastructure/helpers/logger"
import {ContractRepository} from "@database/repositories/contract"
import {ContractService} from "@domain/services/contract"
import {ContractController} from "@infrastructure/controllers/contract"
import {JobRepository} from "@database/repositories/job"
import {JobController} from "@infrastructure/controllers/job"
import {JobService} from "@domain/services/job"
import {ProfileRepository} from "@database/repositories/profile"
import {AdminRepository} from "@database/repositories/admin"
import {AdminService} from "@domain/services/admin"
import {AdminController} from "@infrastructure/controllers/admin"
import {BalanceService} from "@domain/services/balance"
import {BalanceController} from "@infrastructure/controllers/balance"

/**
 * Dependency injection to satisfy Clean Architecture
 */

// Helpers
const logger = new LoggerHelper()

// Repositories
const contractRepository = new ContractRepository()
const jobRepository = new JobRepository()
const profileRepository = new ProfileRepository()
const adminRepository = new AdminRepository()

// Services
const contractService = new ContractService(contractRepository, logger)
const jobService = new JobService(jobRepository, profileRepository, contractRepository, logger)
const adminService = new AdminService(adminRepository, logger)
const balanceService = new BalanceService(contractRepository, jobRepository, profileRepository, logger)

// Controllers
const contractController = new ContractController(contractService)
const jobController = new JobController(jobService)
const adminController = new AdminController(adminService)
const balanceController = new BalanceController(balanceService)

export {
    logger,
    contractRepository,
    contractService,
    contractController,
    jobController,
    adminController,
    balanceController
}