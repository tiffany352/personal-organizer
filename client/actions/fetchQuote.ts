import setQuote from "./setQuote"
import { ActionCreator } from 'redux'
import { ThunkAction } from "redux-thunk"
import { ThunkResult } from "../reducers";

function fetchQuote(): ThunkResult<void> {
  return async dispatch => {
    const response = await fetch("/api/get-quote")
    const body = await response.json()
    const status = body.status
    if (status == 'success') {
      const quote = body.result

      return dispatch(setQuote(quote))
    }
  }
}
export default fetchQuote
