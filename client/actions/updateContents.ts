import { ThunkResult } from "../reducers"
import updateNote from './updateNote'

export default function updateContents(id: number, contents: string): ThunkResult<void> {
  return async dispatch => {
    const response = await fetch("/api/notes/edit", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id, contents
      })
    })
    const body = await response.json()

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
