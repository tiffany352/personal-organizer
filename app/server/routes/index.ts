import Router from 'koa-router'
import notes from './notes'
import send from 'koa-send'

const router = new Router()

router.use('/api/notes', notes.routes())

if (process.env.NODE_ENV == 'production') {
  router.get('/', async (ctx) => await send(ctx, "build/index.html"))
  router.all('/static/*', async (ctx) => {
    await send(ctx, ctx.path.replace('/static', ''), {
      root: 'build/',
      maxAge: 31536000*1000,
      immutable: true
    })
  })
}

export default router
