import { IRouterContext } from "koa-router"
import database from '../../database'
import { Note } from "../../model/Note"

export default async function listNotes(ctx: IRouterContext) {
  const notes: Note[] = await database('notes')
    .select(['rowid', 'title', 'createdAt', 'updatedAt'])
    .whereNull('deletedAt')

  ctx.body = {
    status: 'success',
    result: notes.map((note) => {
      return {
        id: note.rowid,
        title: note.title,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      }
    })
  }
}
