import 'source-map-support/register'
import pjson from '../package.json'
import Logger from './common/logger'
import Service from './common/service'
import sampleRoute from './routes/sample.route'

const logger = new Logger(pjson.name, pjson.version, process.env.LOG_LEVEL || 'debug')
const service = new Service(3000, '0.0.0.0', logger)

service.start()
.then(() => {
    // Add some routes to the express server
    service.app.use(sampleRoute({ logger }))
    // Add a generic error handler
    service.app.use((err, req, res, next) => {
        res.status(500).json({ error: 'Something broke!' })
    })
})

