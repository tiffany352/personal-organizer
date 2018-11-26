import Koa from 'koa'
import Router from 'koa-router'
import hello from './routes/hello'

console.log("hello, backend")
const app = new Koa()
const router = new Router({
  prefix: '/api'
})

router.get('/hello', hello)

if (process.env.NODE_ENV == 'development' || !process.env.NODE_ENV) {
  const koaWebpack = require('koa-webpack')
  koaWebpack().then((middleware: any) => {
    app.use(middleware)
  })  
}

const server = app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000)

export default server
