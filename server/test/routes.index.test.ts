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
      .get('/api/hello')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.status.should.equal('success');
        res.body.result.should.eql('hello, world');
        done();
      });
    });
  });

});
