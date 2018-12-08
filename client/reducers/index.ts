import { combineReducers, Reducer } from "redux"
import notes, { Note } from "./notes"
import currentNote from './currentNote'
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { AddNoteAction } from "../actions/addNote"
import { SetCurrentNoteAction } from "../actions/setCurrentNote"
import { SetEditingAction } from "../actions/setEditing"
import editing from "./editing"
import currentlyOffline from "./currentlyOffline"
import { UpdateNoteAction } from "../actions/updateNote"
import { SetOfflineAction } from "../actions/setOffline"

export type AppState = {
  notes: Note[],
  currentNote: number|null,
  editing: boolean,
  currentlyOffline: boolean
}
export type AppAction =
  AddNoteAction |
  UpdateNoteAction |
  SetCurrentNoteAction |
  SetEditingAction |
  SetOfflineAction

export type ThunkResult<R> = ThunkAction<R, AppState, undefined, AppAction>
export type AppDispatch = ThunkDispatch<AppState, undefined, AppAction>

const rootReducer: Reducer<AppState, AppAction> = combineReducers({
  notes,
  currentNote,
  editing,
  currentlyOffline
})
export default rootReducer
