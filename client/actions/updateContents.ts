import { ThunkResult } from "../reducers"
import updateNote from './updateNote'
import fetchJson from "./fetchJson"

export default function updateContents(id: number, contents: string): ThunkResult<void> {
  return async dispatch => {
    const body = await dispatch(fetchJson("/api/notes/edit", 'POST', {
        id, contents
    }))

    if (body.status == 'success') {
      const note = body.result
      dispatch(updateNote({
        id: note.id,
        contents: contents,
        updatedAt: note.updatedAt
      }))
    }
  }
}
