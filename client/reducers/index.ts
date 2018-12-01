import { combineReducers, Reducer } from "redux"
import notes, { Note } from "./notes"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { AddNoteAction } from "../actions/addNote"

export type AppState = {
  notes: Note[],
}
export type AppAction = AddNoteAction

export type ThunkResult<R> = ThunkAction<R, AppState, undefined, AppAction>
export type AppDispatch = ThunkDispatch<AppState, undefined, AppAction>

const rootReducer: Reducer<AppState, AppAction> = combineReducers({
  notes
})
export default rootReducer
