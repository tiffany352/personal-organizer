import { IRouterContext } from "koa-router"
import database from '../../database'

export default async function deleteNote(ctx: IRouterContext) {
  const {
    id
  } = ctx.request.body

  if (typeof id != 'number') {
    ctx.throw(400, 'id must be a number')
  }

  await database('notes')
  .where('rowid', id)
  .delete()

  ctx.body = {
    status: 'success'
  }
}
