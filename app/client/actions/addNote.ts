import { Note } from "../reducers/notes"

export type AddNoteAction = {
  type: 'addNote',
  note: Note
}

export default function addNote(note: Note): AddNoteAction {
  return {
    type: 'addNote',
    note: note
  }
}
