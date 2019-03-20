import { ThunkResult } from "../reducers"
import removeNote from './removeNote'
import fetchJson from "./fetchJson"

export default function deleteNote(id: number): ThunkResult<void> {
  return async dispatch => {
    const body = await dispatch(fetchJson("/api/notes/delete", 'POST', {
        id
    }))

    if (body.status == 'success') {
      dispatch(removeNote(id))
    }
  }
}
