const server = require('../index')

const axios = require('axios')

const expect = require('chai').expect

describe('Simple For Tutorial1', () => {
    it('取得所有的lafs（使用store/laf.js）', async () => {
        const res = await axios.get('http://127.0.0.1:9000/lafs')
        expect(res.status).to.equal(200)
        expect(res.data[0].username).to.equal('aaa')
        expect(res.data[0].item).to.equal('Phone')
        expect(res.data[1].username).to.equal('bbb')
        expect(res.data[1].item).to.equal('Book')
    });

    it('创建一个新的laf（使用store/laf.js）', async () => {
        const res = await axios.post('http://127.0.0.1:9000/admin', {username: 'ccc', item: 'Girl Friend'})
        expect(res.status).to.equal(200)
        expect(res.data).to.equal('OK')
    });

    it('创建后取得所有的lafs（使用store/laf.js）', async () => {
        const res = await axios.get('http://127.0.0.1:9000/lafs')
        expect(res.status).to.equal(200)
        expect(res.data[0].username).to.equal('aaa')
        expect(res.data[0].item).to.equal('Phone')
        expect(res.data[1].username).to.equal('bbb')
        expect(res.data[1].item).to.equal('Book')
        expect(res.data[2].username).to.equal('ccc')
        expect(res.data[2].item).to.equal('Girl Friend')
    });

    after(() => process.exit())
})