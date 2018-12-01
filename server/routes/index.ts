import Router from 'koa-router'
import getQuote from './getQuote'
import notes from './notes'

const router = new Router({
  prefix: '/api'
})

router.get('/get-quote', getQuote)
router.use('/notes', notes.routes())

export default router
