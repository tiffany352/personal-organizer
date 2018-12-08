import { Note } from "../reducers/notes"

export type UpdateNoteAction = {
  type: 'updateNote',
  note: Partial<Note>
}

export default function updateNote(note: Partial<Note>): UpdateNoteAction {
  return {
    type: 'updateNote',
    note: note
  }
}
