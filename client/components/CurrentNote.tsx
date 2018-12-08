import * as React from 'react'
import { AppState, AppDispatch } from "../reducers"
import { connect } from "react-redux"
import NoteView, { NoteViewProps } from "./NoteView"
import { Spin } from 'antd'
import setEditing from '../actions/setEditing'
import updateContents from '../actions/updateContents'
import deleteNote from '../actions/deleteNote'

function CurrentNoteView(props: NoteViewProps & {id: number}) {
  if (props.note != undefined) {
    const key = `${props.id}-${props.note.contents ? 'loaded' : 'unloaded'}`
    return (
      <NoteView key={key} {...props} />
    )
  }
  else if (props.id != null) {
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
    id, note,
    editing: state.editing
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setEditing: (value: boolean) =>
      dispatch(setEditing(value)),
    updateContents: (id: number, contents: string) =>
      dispatch(updateContents(id, contents)),
    deleteNote: (id: number) =>
      dispatch(deleteNote(id))
  }
}

const CurrentNote = connect(mapStateToProps, mapDispatchToProps)(CurrentNoteView)
export default CurrentNote