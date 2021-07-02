import 'source-map-support/register'
import Logger from './common/logger'
import Service from './common/service'
import pjson from '../package.json'
import sampleRoute from './routes/sample.route'

const logger = new Logger(pjson.name, pjson.version, process.env.LOG_LEVEL || 'debug')
const service = new Service(3000, '0.0.0.0', logger)

const deps = { logger }

service.start()
.then(() => {
    service.app.use(sampleRoute(deps))
    service.app.use((err, req, res, next) => {
        res.status(500).send('Something broke!')
    })
})

