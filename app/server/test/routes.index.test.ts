process.env.NODE_ENV = 'test'

import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../app'

const should = chai.should()
chai.use(chaiHttp)

describe('routes : index', () => {
  describe('GET /', () => {
    it('should return json', async () => {
      const res = await chai.request(server).get('/api/get-quote')
      res.status.should.eql(200)
      res.type.should.eql('application/json')
      res.body.status.should.equal('success')
      res.body.result.should.be.a('string')
    })
  })

  describe('GET /api/notes/get/1', () => {
    it('should return json', async () => {
      const res = await chai.request(server).get('/api/notes/get/1')
      res.status.should.eql(200)
      res.type.should.eql('application/json')
      res.body.status.should.equal('success')
      res.body.result.should.be.a('object')
      res.body.result.id.should.equal(1)
      res.body.result.title.should.equal('test')
      res.body.result.contents.should.equal('testContents')
      res.body.result.createdAt.should.equal(123)
    })
  })

  describe('PUT /api/notes/add', () => {
    it('should return json', async () => {
      const res = await chai.request(server).put('/api/notes/add').send({
        title: 'test',
        contents: 'testContents'
      })
      res.status.should.eql(200)
      res.type.should.eql('application/json')
      res.body.status.should.equal('success')
      res.body.result.should.be.a('object')
      res.body.result.id.should.be.a('number')
      res.body.result.createdAt.should.be.a('number')
    })
  })

  describe('GET /api/notes/list', () => {
    it('should return json', async () => {
      const res = await chai.request(server).get('/api/notes/list')
      res.status.should.eql(200)
      res.type.should.eql('application/json')
      res.body.status.should.equal('success')
      res.body.result.should.be.a('array')
      res.body.result.length.should.be.at.least(1)
      res.body.result[0].id.should.be.a('number')
      res.body.result[0].title.should.be.a('string')
      res.body.result[0].createdAt.should.be.a('number')
    })
  })

  describe('POST /api/notes/edit', () => {
    it('should return json', async () => {
      const addRes = await chai.request(server).put('/api/notes/add').send({
        title: 'test',
        contents: 'empty'
      })
      addRes.status.should.eql(200)
      addRes.type.should.eql('application/json')
      addRes.body.status.should.equal('success')
      addRes.body.result.id.should.be.a('number')
      const id = addRes.body.result.id

      const res = await chai.request(server).post('/api/notes/edit').send({
        id: id,
        title: 'new title'
      })
      res.status.should.eql(200)
      res.type.should.eql('application/json')
      res.body.status.should.equal('success')
      res.body.result.should.be.a('object')
      res.body.result.id.should.equal(id)
      res.body.result.updatedAt.should.be.a('number')

      const getRes = await chai.request(server).get('/api/notes/get/'+id)
      getRes.status.should.eql(200)
      getRes.type.should.eql('application/json')
      getRes.body.status.should.equal('success')
      getRes.body.result.id.should.equal(id)
      getRes.body.result.title.should.equal('new title')
    })
  })

})
