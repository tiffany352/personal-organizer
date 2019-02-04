import * as React from 'react'
import { Spin, Button, Popconfirm, Tag, Icon } from 'antd'

export type NoteButtonsProps = {
  enableEditing: () => void,
  deleteNote: () => void,
}

export default function NoteButtons(props: NoteButtonsProps) {
  return (
    <Button.Group>
      <Button icon='edit' onClick={props.enableEditing}>Edit</Button>
      <Popconfirm title="Permanently delete this note?" onConfirm={props.deleteNote}>
        <Button icon='delete'>Delete</Button>
      </Popconfirm>
    </Button.Group>
  )
}
