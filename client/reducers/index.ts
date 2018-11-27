import { IncrementAction } from "../actions/increment"
import { combineReducers, Reducer } from "redux"
import counter from "./counter"

export type State = {
  counter: number,
}
export type Action = IncrementAction

const rootReducer: Reducer<State, Action> = combineReducers({
  counter: counter
})
export default rootReducer
