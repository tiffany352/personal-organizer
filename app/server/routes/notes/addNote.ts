import { IRouterContext } from "koa-router"
import database from '../../database'

export default async function addNote(ctx: IRouterContext) {
  const {
    title,
    contents
  } = ctx.request.body

  if (typeof title != 'string') {
    ctx.throw(400, 'request json title required')
  }
  if (typeof contents != 'string') {
    ctx.throw(400, 'request json contents required')
  }

  const createdAt = new Date().getTime()
  const [id]: number[] = await database('notes')
    .insert({
      title,
      contents,
      createdAt
    })

  ctx.body = {
    status: 'success',
    result: {
      id,
      createdAt
    }
  }
}
