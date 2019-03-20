export type SetEditingAction = {
  type: 'setEditing',
  value: boolean
}

export default function setEditing(value: boolean): SetEditingAction {
  return {
    type: 'setEditing',
    value
  }
}
