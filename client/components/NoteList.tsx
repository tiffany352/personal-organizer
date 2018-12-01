import * as React from 'react'
import NoteView from "./NoteView"
import { Note } from '../reducers/notes'
import { connect } from 'react-redux'
import { AppState } from '../reducers'

export function NoteListView(props: { notes: Note[] }) {
  return (
    <div>
      {props.notes.map((note) => (
        <NoteView {...note} />
      ))}
    </div>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    notes: state.notes
  }
}

const NoteList = connect(mapStateToProps)(NoteListView)
export default NoteList
