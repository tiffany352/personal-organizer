import Koa from 'koa'
import foo from './test'
import koaWebpack from 'koa-webpack'

console.log("hello, backend")
const app = new Koa()

koaWebpack().then((middleware) =>
  app.use(middleware))

/*app.use(async ctx => {
  ctx.body = foo()
})*/

app.listen(3000)