import { AppAction } from "."

export default function editing(state: boolean, action: AppAction): boolean {
  if (action.type == 'setOffline') {
    return action.value
  }

  return state || false
}
