const should = require('should');
const request = require('supertest');
//var app = require('../app');
var app = 'http://localhost:3000';

describe('controller/v1/block/get.js test', () => {

    before((done) => {
        done();
    });

    describe('#getBlock api', () => {
        it('should be getBlock success', (done) => {
            request(app)
                .get('/v1/block/4f1Sp/UD55JX5+kQCveUCpyenaPwqmpC')
                .set('Accept', 'application/json')
                .expect(200)
                .then(response => {
                    let data = response.body;
                    data.state.should.be.equal(0);
                    data.result.should.be.not.empty();
                    data.result.address.should.have.property('items');
                    data.result.transaction.should.have.property('items');
                    done();
                }).catch(err => {
                    done(err);
                })


        });
    });

    describe('#getBalance api', () => {
        it('should be getbalance success', done => {
            request(app).get('/v1/balance/4f1Sp/UD55JX5+kQCveUCpyenaPwqmpC')
                .set('Accept', 'application/json')
                .expect(200)
                .then(response => {

                    let data = response.body;
                    data.state.should.be.equal(0);
                    data.result.should.be.not.empty();
                    parseFloat(data.result).should.be.a.Number().and.above(0);
                    done();
                }).catch(err => {
                    done(err);
                })

        })
    })

    describe('#getstats api', () => {
        it('should be getstats success', done => {
            request(app).get('/v1/stats')
                .set('Accept', 'application/json')
                .expect(200)
                .then(response => {

                    let data = response.body;
                    data.state.should.be.equal(0);
                    data.result.should.be.an.Object();
                    data.result.should.have.property('blocks');
                    data.result.should.have.property('main blocks');
                    data.result.should.have.property('chain difficulty');
                    done();
                }).catch(err => {
                    done(err);
                })

        })
    })


    after((done) => {
        done();
    });
})