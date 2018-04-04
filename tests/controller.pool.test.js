const should = require('should');
const request = require('supertest');
//var app = require('../app');
var app = 'http://localhost:3000';

describe('controller/v1/pool/get.js test', () => {

    before((done) => {
        done();
    });

    describe('#getMiners api', () => {
        it('should be getMiners success', (done) => {
            request(app)
                .get('/v1/pool/miners')
                .set('Accept', 'application/json')
                .expect(200)
                .then(response => {
                    let data = response.body;
                    data.state.should.be.equal(0);
                    data.result.should.be.an.Object();
                    data.result.should.have.property('miners');
                    data.result.miners.should.have.property('items');
                    data.result.miners.totalPage.should.aboveOrEqual(0);
                    data.result.miners.items.should.be.an.Array();
                    data.result.miners.items.length.should.above(0);
                    done();
                }).catch(err => {
                    done(err);
                })


        });
    });

     


    after((done) => {
        done();
    });
})