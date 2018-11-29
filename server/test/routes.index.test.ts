process.env.NODE_ENV = 'test'

import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../app'

const should = chai.should()
chai.use(chaiHttp)

describe('routes : index', () => {

  describe('GET /', () => {
    it('should return json', (done) => {
      chai.request(server)
      .get('/api/get-quote')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.status.should.equal('success');
        res.body.result.should.be.a('string');
        done();
      });
    });
  });

  describe('GET /api/notes/get/1', () => {
    it('should return json', (done) => {
      chai.request(server)
      .get('/api/notes/get/1')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.status.should.equal('success');
        res.body.result.should.be.a('object');
        res.body.result.id.should.equal(1);
        res.body.result.title.should.equal('test');
        res.body.result.contents.should.equal('testContents');
        res.body.result.createdAt.should.equal(123);
        done();
      });
    });
  });

});
