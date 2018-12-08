import addNote from './addNote'
import { ThunkResult } from "../reducers"
import fetchJson from './fetchJson'

export default function fetchNotesList(): ThunkResult<void> {
  return async dispatch => {
    const body = await dispatch(fetchJson("/api/notes/list"))

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
