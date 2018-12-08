import { AppAction } from "."

export default function editing(state: boolean, action: AppAction): boolean {
  if (action.type == 'setEditing') {
    return action.value
  }
  if (action.type == 'setCurrentNote') {
    return false
  }

  return state != undefined ? state : null
}
