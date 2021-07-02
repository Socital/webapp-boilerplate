import SampleService from '../services/sample.service'

class SampleController {
    constructor(logger) {
        this.service = new SampleService(logger)
    }
    post (req, res) {
        console.log()
        const result = this.service.createAndPrintASample(req.body)
        res.json({result})
    }
}

export default SampleController
