import { Environment, Test } from 'socital-lib'

describe('msc-skeleton [routes] [test] [method] ', function () {
    const env = new Environment({pjson: {name: 'MSC_SKELETON'}})
    const libTestInstance = new Test({ env })
    libTestInstance.initialize()

    const serviceURI = `${libTestInstance.env.vars.APP_ROOT_URI}:${libTestInstance.env.vars.SERVER_PORT}`

    it('should make a useful assertion', (done) => { done() })
})
