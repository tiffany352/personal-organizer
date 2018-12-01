import * as React from 'react'
import { Note } from '../reducers/notes'

export default function NoteView(props: Note) {
  return (
    <div>
      <h2>{props.title || 'Untitled'}</h2>
      <p>{props.contents || 'No contents to show.'}</p>
      <span>{new Date(props.updatedAt || props.createdAt).toString()}</span>
    </div>
  )
}
