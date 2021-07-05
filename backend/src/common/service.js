import express from 'express'

export default class logger {
    constructor(port = 3000, host = 'localhost', logger) {
        this.port = port
        this.host = host
        this.logger = logger
        this.app = express()
        this.app.disable('x-powered-by')
        this.app.use('', [
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
