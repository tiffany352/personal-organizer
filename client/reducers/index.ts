import { SetQuoteAction } from "../actions/setQuote"
import { combineReducers, Reducer } from "redux"
import quote from "./quote"
import { ThunkAction, ThunkDispatch } from "redux-thunk";

export type AppState = {
  quote: string|null,
}
export type AppAction = SetQuoteAction

export type ThunkResult<R> = ThunkAction<R, AppState, undefined, AppAction>
export type AppDispatch = ThunkDispatch<AppState, undefined, AppAction>

const rootReducer: Reducer<AppState, AppAction> = combineReducers({
  quote
})
export default rootReducer
