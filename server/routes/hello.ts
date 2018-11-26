import { IRouterContext } from "koa-router";

export default function hello(ctx: IRouterContext) {
  ctx.body = {
    status: 'success',
    result: 'hello, world'
  }
}
