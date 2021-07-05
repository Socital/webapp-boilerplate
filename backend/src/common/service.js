import express from 'express'

export default class logger {
    constructor(port = 3000, host = 'localhost', logger) {
        this.port = port
        this.host = host
        this.logger = logger
        this.app = express()
        this.app.disable('x-powered-by')
        this.app.use('', [
            this.handleCors,
            express.urlencoded({ extended: true }),
            express.json({ limit: '50mb' })
        ])

        process.on('uncaughtException', this.uncaughtException.bind(this))
        process.on('unhandledRejection', this.unhandledRejection.bind(this))
        process.on('SIGTERM', async () => { await this.stop() })
        process.on('SIGINT', async () => { await this.stop() })
    }

    async start () {
        this.logger.info(`Starting service on ${this.host}:${this.port}`)
        await this.listen()
    }

    async listen () {
        return new Promise((resolve, reject) => {
            this.server = this.app.listen(this.port, this.host)
                .on('listening', () => resolve())
                .on('error', (err) => reject(err))
        })
    }

    async stop () {
        this.logger.info(`Service shutting down`)
        return new Promise((resolve) => {
            if (this.server === undefined) { return resolve() }
            this.server.close(err => {
                if (err) this.logger.error(err)
                return resolve()
            })
        })
    }

    handleCors (req, res, next) {
        if (req.method === 'OPTIONS') {
            var headers = {}
            headers['Access-Control-Allow-Origin'] = '*'
            headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
            headers['Access-Control-Allow-Credentials'] = false
            headers['Access-Control-Max-Age'] = '86400'
            headers['Access-Control-Allow-Headers'] = 'X-Requested-With, Authorization, X-HTTP-Method-Override, Content-Type, Accept, X-SOCITAL-DOMAIN'
            res.writeHead(200, headers)
            return res.end()
        }
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept')
        next()
    }

    unhandledRejection (err) {
        // TODO: exit if error is not Operational
        // https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/shuttingtheprocess.md
        if (this.logger) this.logger.error({err})
        else console.error(err)
        process.exit(1)
    }

    uncaughtException (err) {
        // TODO: exit if error is not Operational
        // https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/shuttingtheprocess.md
        if (this.logger) this.logger.error({err})
        else console.error(err)
        process.exit(1)
    }
}
