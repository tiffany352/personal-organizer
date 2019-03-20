import { Note } from "../reducers/notes"

export type RemoveNoteAction = {
  type: 'removeNote',
  id: number
}

export default function removeNote(id: number): RemoveNoteAction {
  return {
    type: 'removeNote',
    id
  }
}
