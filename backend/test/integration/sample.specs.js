import fetch from 'node-fetch'
import { assert } from 'chai'

describe('msc-skeleton [routes] [test] [method] ', function () {
    it('should make a useful assertion', async (done) => {
        const options = { method: 'POST', body: { foo: 'hello' } }
        let response = await fetch('http://localhost:3000/sample', options)
        try {
            let json = await response.json()
            console.log(json)
            assert.equal(true, true)
        } catch (err) {
            done(err)
        }
    })
})
