import { IRouterContext } from "koa-router"
import database from '../../database'

type Note = {
  rowid: number,
  createdAt: number,
  updatedAt: number|null,
  deletedAt: number|null,
  contents: string,
  title: string
}

export default async function getNote(ctx: IRouterContext) {
  const id: number = ctx.params.id

  const result: Note[] = await database('notes')
    .select('*')
    .where('rowid', id)

  if (result.length > 0) {
    const note = result[0]
    ctx.body = {
      status: 'success',
      result: {
        id: note.rowid,
        title: note.title,
        contents: note.contents,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        deletedAt: note.deletedAt
      }
    }
  }
  else {
    ctx.response.status = 400
    ctx.body = {
      status: 'failure',
      reason: 'doesNotExist'
    }
  }
}
