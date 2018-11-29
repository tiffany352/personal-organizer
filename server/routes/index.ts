import Router from 'koa-router'
import getQuote from './getQuote'
import notes from './notes'

const router = new Router()

router.get('/getQuote', getQuote)
router.all('/notes', notes.routes())

export default router
