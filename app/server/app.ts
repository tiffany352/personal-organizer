import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import router from './routes'

console.log("hello, backend")
const app = new Koa()

app.use(bodyParser())

if (process.env.NODE_ENV == 'development' || !process.env.NODE_ENV) {
  const koaWebpack = require('koa-webpack')
  const config = require('../webpack.dev.js')
  koaWebpack({
    config
  }).then((middleware: any) => {
    app.use(middleware)
  })  
}

const server = app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000)

export default server
