import addNote from './addNote'
import { ThunkResult } from "../reducers"

export default function fetchNotesList(): ThunkResult<void> {
  return async dispatch => {
    const response = await fetch("/api/notes/list")
    const body = await response.json()

    if (body.status == 'success') {
      const notes = body.result
      for (const note of notes) {
        dispatch(addNote({
          id: note.id,
          title: note.title,
          createdAt: note.createdAt,
          updatedAt: note.updatedAt
        }))
      }
    }
  }
}
