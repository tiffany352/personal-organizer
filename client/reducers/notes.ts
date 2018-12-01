import { AppAction } from "."

export type Note = {
  id: number,
  title: string,
  contents?: string,
  createdAt: number,
  updatedAt: number|null
}

export default function notes(state: Note[], action: AppAction): Note[] {
  if (action.type == 'addNote') {
    const newState = state.filter((note) => note.id != action.note.id)
    newState.push(action.note)
    return newState
  }

  return state || []
}
