import { ThunkResult } from "../reducers"
import setCurrentNote from './setCurrentNote'
import fetchNote from './fetchNote'

export default function fetchCurrentNote(id: number): ThunkResult<void> {
  return async dispatch => {
    dispatch(setCurrentNote(id))
    dispatch(fetchNote(id))
  }
}
