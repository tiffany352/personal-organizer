import addNote from './addNote'
import fetchJson from './fetchJson'
import { ThunkResult } from "../reducers"

export default function fetchNote(id: number): ThunkResult<void> {
  return async dispatch => {
    const body = await dispatch(fetchJson("/api/notes/get/"+id))

    if (body && body.status == 'success') {
      const note = body.result
      dispatch(addNote({
        id: note.id,
        title: note.title,
        contents: note.contents,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        tags: note.tags,
      }))
    }
  }
}
