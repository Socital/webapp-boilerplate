import { Router } from 'express'
import SampleController from '../controllers/sample.controller'

const router = (deps) => {
    const result = Router()
    const controller = new SampleController(deps.logger)

    result.get('/sample', () => console.log('Put sample'))
    result.post('/sample', (req, res) => controller.post(req, res))
    result.put('/sample', () => console.log('Put sample'))
    result.delete('/sample', () => console.log('Delete sample'))

    return result
}

export default router

