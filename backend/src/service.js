/** Main service module */
import express from 'express'

import AbstractService from './common/lib/libService'
import JWT from './common/lib/libJWT'
import Mongo from './common/lib/libMongo'
import Elastic from './common/lib/libES'
import handleCors from './common/middlewares/handleCors'
import logRequest from './common/middlewares/logRequest'
import errorHandlers from './common/middlewares/errorHandlers'
import extendExpress from './common/middlewares/extendExpress'
import routes from './routes.js'

/** Class representing the service. */
class Service extends AbstractService {
    initialize ({env, logger, options}) {
        super.initialize({ env, logger, options })
        this.server = null
        this.serviceName = 'msc-skeleton'
        this.serviceURI = `/api/:version/${this.serviceName}`
        this.env = env
        this.app = express()
        this.jwt = new JWT({JWT_SECRET: this.env.vars.JWT_SECRET, name: `MSC_SKELETON`})
        this.middlewares = [
            handleCors(),
            extendExpress.queueJSON,
            express.urlencoded({extended: true, limit: '500kb', parameterLimit: 5000}),
            express.json({limit: '50mb'}),
            errorHandlers.invalidJSON,
            logRequest()
        ]

        this.errorHandlers = [
            errorHandlers.logErrors,
            errorHandlers.handle404
        ]

        return this.initializeDbs()
    }
    initializeDbs () {
        this.elastic = new Elastic({ host7: this.env.vars.ELASTICSEARCH_7_HOST })
        this.mongo = new Mongo({
            URI: this.env.vars.MONGO_URI_WEBAPP,
            collections: [
                'apps',
                'socialusers',
                'jobs',
                'emailAnalytics',
                'users',
                'plugins',
                'pages',
                'draws',
                'subscriptions',
                'socialLogins'
            ]
        })
        return this.mongo
        .initialize()
        .then(() => { this.colWebapp = this.mongo.collections })
    }

    setRoutes () {
        this.routes = Object.keys(routes).map(x => routes[x])
        // Adds common middlewares
        this.app.use(this.serviceURI, this.middlewares)
        // Adds service routes
        this.app.use(this.serviceURI, this.routes)
        // Adds error handlers
        this.app.use(this.serviceURI, this.errorHandlers)
    }

    closeConnections () {
        return this.mongo.shutDown('mongo')
    }
}

export default new Service()
