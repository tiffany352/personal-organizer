import Koa from 'koa'
import foo from './test'
import Router from 'koa-router'
import koaWebpack from 'koa-webpack'

console.log("hello, backend")
const app = new Koa()
const router = new Router({
  prefix: '/api'
})

router.get('/test', (ctx) => {
  ctx.body = {
    result: 'hello, world'
  }
})

koaWebpack().then((middleware) => {
  app
    .use(middleware)
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000)
})
