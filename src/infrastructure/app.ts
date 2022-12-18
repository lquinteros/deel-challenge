import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import { getProfile } from '@infrastructure/middleware/getProfile'
import contracts from '@routes/contract'
import jobs from '@routes/job'
import admin from '@routes/admin'
import balance from '@routes/balance'
import {LoggerHelper} from '@infrastructure/helpers/logger'
import buildAssociations from "@database/models/setup"

const log = new LoggerHelper()

log.log('Creating app')
const app = express()

buildAssociations()

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('logger', log)

// Routes
log.log('Initializing routes')
app.use('/admin', getProfile, admin)
app.use('/contracts', getProfile, contracts)
app.use('/jobs', getProfile, jobs)
app.use('/balance', getProfile, balance)

export default app