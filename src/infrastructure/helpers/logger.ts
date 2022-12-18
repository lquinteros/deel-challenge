import {LoggerInterface} from '@domain/helpers/logger'
import { Logger } from 'tslog'

export class LoggerHelper implements LoggerInterface {
    private readonly logger = new Logger()

    error(message: string) {
        this.logger.error(message)
    }

    info(message: string) {
        this.logger.info(message)
    }

    log(message: string) {
        this.logger.silly(message)
    }

}