import Koa from 'koa'
import Router from 'koa-router'
import getQuote from './routes/getQuote'
import getNote from './routes/notes/getNote'

console.log("hello, backend")
const app = new Koa()
const router = new Router({
  prefix: '/api'
})

router.get('/get-quote', getQuote)
router.get('/notes/get/:id', getNote)

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
