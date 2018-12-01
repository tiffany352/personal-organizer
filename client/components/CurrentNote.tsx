import * as React from 'react'
import { AppState } from "../reducers"
import { connect } from "react-redux"
import { Note } from "../reducers/notes"
import NoteView from "./NoteView"
import { Spin } from 'antd'

function CurrentNoteView({id, note}: { id: number|null, note?: Note }) {
  if (note != undefined) {
    return (
      <NoteView note={note} />
    )
  }
  else if (id != null) {
    return (
      <Spin />
    )
  }
  else {
    return (
      <div></div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  const id = state.currentNote
  const note = state.notes.find((note) => note.id == id)

  return {
    id, note
  }
}

const CurrentNote = connect(mapStateToProps)(CurrentNoteView)
export default CurrentNote