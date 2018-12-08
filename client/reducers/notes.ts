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

  if (action.type == 'updateNote') {
    return state.map((note) => {
      if (note.id == action.note.id) {
        return {
          id: action.note.id || note.id,
          title: action.note.title || note.title,
          contents: action.note.contents || note.contents,
          updatedAt: action.note.updatedAt || note.updatedAt,
          createdAt: action.note.createdAt || note.createdAt
        }
      }
      return note
    })
  }

  return state || []
}
