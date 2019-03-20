import { AppAction } from "."

export default function currentNote(state: number|null, action: AppAction): number|null {
  if (action.type == 'setCurrentNote') {
    if (state && action.id == state) {
      return null
    }
    else {
      return action.id
    }
  }

  if (action.type == 'removeNote') {
    if (action.id == state) {
      return null
    }
  }

  return state || null
}
