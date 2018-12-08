import Router from 'koa-router'
import notes from './notes'

const router = new Router()

router.use('/api/notes', notes.routes())

export default router
