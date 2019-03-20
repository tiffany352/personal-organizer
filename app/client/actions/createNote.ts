import { ThunkResult } from "../reducers"
import addNote from './addNote'
import fetchJson from "./fetchJson"

export default function createNote(): ThunkResult<Promise<number>> {
  return async dispatch => {
    const body = await dispatch(fetchJson("/api/notes/add", 'PUT', {
        title: 'Untitled',
        contents: ''
    }))

    if (body.status == 'success') {
      const note = body.result
      dispatch(addNote({
        id: note.id,
        createdAt: note.createdAt,
        updatedAt: null,
        title: 'Untitled',
        contents: '',
      }))
      return note.id
    }
  }
}
