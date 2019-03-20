import * as React from 'react'
import { Spin } from 'antd'
import { Note } from '../../reducers/notes'
import Markdown from './Markdown'
import NoteTagList from './NoteTagList'
import NoteButtons from './NoteButtons'

export type NoteDisplayProps = {
  note: Note,
  enableEditing: () => void,
  deleteNote: () => void,
}

export default function NoteDisplay(props: NoteDisplayProps) {
  const note = props.note

  let contents: JSX.Element
  if (note.contents) {
    contents = (
      <Markdown>
        {note.contents}
        <span>{new Date(note.updatedAt || note.createdAt).toString()}</span>
      </Markdown>
    )
  }
  else {
    contents = (
      <div>
        <Spin />
      </div>
    )
  }

  return (
    <div>
      <NoteButtons enableEditing={props.enableEditing} deleteNote={props.deleteNote} />
      <h1>{note.title || 'Untitled'}</h1>
      <NoteTagList tags={note.tags} />

      {contents}
    </div>
  )
}
