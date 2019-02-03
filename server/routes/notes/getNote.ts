import { IRouterContext } from "koa-router"
import database from '../../database'
import { Note } from "../../model/Note"

export default async function getNote(ctx: IRouterContext) {
  const id: number = ctx.params.id

  const result: Note[] = await database('notes')
    .select('*')
    .where('rowid', id)

  if (result.length > 0) {
    const note = result[0]

    const result_tags: { title: string }[] = await database('tags')
      .join('note_tags', 'note_tags.tagid', '=', 'tags.rowid')
      .where('note_tags.noteid', id)
      .select('tags.title')
    const tags = result_tags.map((row) => row.title)

    ctx.body = {
      status: 'success',
      result: {
        id: note.rowid,
        title: note.title,
        contents: note.contents,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        deletedAt: note.deletedAt,
        tags,
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
