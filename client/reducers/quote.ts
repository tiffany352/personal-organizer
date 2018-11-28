import { AppAction } from ".";

export default function quote(state: string|null, action: AppAction): string|null {
  if (action.type == 'setQuote') {
    return action.quote
  }

  return state || null
}
