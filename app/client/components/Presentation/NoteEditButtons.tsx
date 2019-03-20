import * as React from 'react'
import { Spin, Button, Popconfirm, Tag, Icon } from 'antd'

export type NoteEditButtonsProps = {
  saveAndExit: () => void,
  discardAndExit: () => void,
}

export default function NoteEditButtons(props: NoteEditButtonsProps) {
  return (
    <Button.Group>
      <Button icon='save' onClick={props.saveAndExit}>Save</Button>
      <Button icon='cancel' onClick={props.discardAndExit}>Discard</Button>
    </Button.Group>
  )
}
