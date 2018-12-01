import * as React from 'react'
import { Spin } from 'antd'
import { Note } from '../reducers/notes'

export default function NoteView({ note }: { note: Note }) {
  return (
    <React.Fragment>
      <h1>{note.title||'Untitled'}</h1>
      {
        note.contents
        ? <p>{note.contents}</p>
        : <div><Spin /></div>
      }
      <span>{new Date(note.updatedAt || note.createdAt).toString()}</span>
    </React.Fragment>
  )
}
