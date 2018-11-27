import { Action } from ".";

export default function counter(state: number, action: Action): number {
  if (action.type == 'increment') {
    return state + 1
  }

  return state || 0
}
