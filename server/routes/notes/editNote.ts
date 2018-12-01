import { IRouterContext } from "koa-router"
import database from '../../database'

export default async function editNote(ctx: IRouterContext) {
  const {
    id,
    title,
    contents
  } = ctx.request.body

  if (typeof id != 'number') {
    ctx.throw(400, 'id must be a number')
  }
  if (title != null && title != undefined && typeof title != 'string') {
    ctx.throw(400, 'request json title must be a string')
  }
  if (contents != null && contents != undefined && typeof contents != 'string') {
    ctx.throw(400, 'request json contents must be a string')
  }

  const updatedAt = new Date().getTime()

  await database('notes')
  .where('rowid', id)
  .update({
    title,
    contents,
    updatedAt
  })

  ctx.body = {
    status: 'success',
    result: {
      id,
      updatedAt,
    }
  }
}
