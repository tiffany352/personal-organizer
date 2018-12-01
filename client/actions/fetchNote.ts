import addNote from './addNote'
import { ThunkResult } from "../reducers"

export default function fetchNote(id: number): ThunkResult<void> {
  return async dispatch => {
    const response = await fetch("/api/notes/get/"+id)
    const body = await response.json()

    if (body.status == 'success') {
      const note = body.result
      dispatch(addNote({
        id: note.id,
        title: note.title,
        contents: note.contents,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt
      }))
    }
  }
}
