import Router from 'koa-router'
import getNote from './getNote'

const router = new Router()

router.get('/get/:id', getNote)

export default router
