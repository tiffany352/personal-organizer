import { combineReducers, Reducer } from "redux"
import notes, { Note } from "./notes"
import currentNote from './currentNote'
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { AddNoteAction } from "../actions/addNote"
import { SetCurrentNoteAction } from "../actions/setCurrentNote"

export type AppState = {
  notes: Note[],
  currentNote: number|null
}
export type AppAction = AddNoteAction | SetCurrentNoteAction

export type ThunkResult<R> = ThunkAction<R, AppState, undefined, AppAction>
export type AppDispatch = ThunkDispatch<AppState, undefined, AppAction>

const rootReducer: Reducer<AppState, AppAction> = combineReducers({
  notes,
  currentNote
})
export default rootReducer
