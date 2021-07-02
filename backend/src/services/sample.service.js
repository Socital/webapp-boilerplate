import SampleModel from '../models/sample.model'

export default class SampleService {
    constructor(logger) {
        this.logger = logger
    }

    createAndPrintASample (obj) {
        const sample = new SampleModel({ logger: this.logger }, obj)
        this.logger.debug(`Here is your created sample`, sample)
        return sample
    }

}