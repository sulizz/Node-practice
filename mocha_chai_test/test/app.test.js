let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect

//config
chai.use(chaiHttp);

describe('Testing Rest API', () => {
    it ('testing /route', () => {
        chai.request("http://localhost:6700/")
        .get('/')
        .then(results => {
            expect(results).to.have.status(200);
            done();
        })
        .catch(err => {
            throw err;
        })
    })
    it ('testing /wrongroute ', () => {
        chai.request("http://localhot:6712/")
        .get('/yy')
        .then(results => {
            expect(results).to.have.status(404);
            done();
        })
        .catch(err => {
            throw err;
        })
    })
    it ('testing /wrongroute ', () => {
        chai.request("http://localhot:6712/")
        .post('/test')
        .then(results => {
            expect(results).to.have.status(200);
            done();
        })
        .catch(err => {
            throw err;
        })
    })
    it ('testing /wrongroute ', () => {
        chai.request("http://localhot:6712/")
        .put('/test')
        .then(results => {
            expect(results).to.have.status(200);
            done();
        })
        .catch(err => {
            throw err;
        })
    })
})