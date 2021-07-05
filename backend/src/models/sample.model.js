class SampleModel {
    constructor (deps, obj) {
        this.logger = deps.logger
        this.logger.debug(`Creating a sample object`)
        const generated = Object.assign({}, obj, { date: new Date().toISOString() })
        console.log({}, obj, generated)
        return Object.freeze(generated)
    }
}

export default SampleModel

