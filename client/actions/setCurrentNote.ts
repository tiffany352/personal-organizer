export type SetCurrentNoteAction = {
  type: 'setCurrentNote',
  id: number|null
}

export default function setCurrentNote(id: number|null): SetCurrentNoteAction {
  return {
    type: 'setCurrentNote',
    id
  }
}
