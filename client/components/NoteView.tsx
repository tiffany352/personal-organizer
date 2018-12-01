import * as React from 'react'
import { Card } from 'antd'
import { Note } from '../reducers/notes'

export default function NoteView(props: Note) {
  return (
    <Card title={props.title || 'Untitled'}>
      <p>{props.contents || 'No contents to show.'}</p>
      <span>{new Date(props.updatedAt || props.createdAt).toString()}</span>
    </Card>
  )
}
