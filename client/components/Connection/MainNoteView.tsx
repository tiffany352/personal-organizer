import * as React from 'react'
import { AppState, AppDispatch } from "../../reducers"
import { connect } from "react-redux"
import NoteDisplay from "../Presentation/NoteDisplay"
import NoteEditor from '../Presentation/NoteEditor'
import { Spin } from 'antd'
import setEditing from '../../actions/setEditing'
import updateContents from '../../actions/updateContents'
import deleteNote from '../../actions/deleteNote'
import { Note } from '../../reducers/notes'

type PropsFromRedux = {
  id: number,
  note?: Note,
  editing: boolean,
  setEditing: (value: boolean) => void,
  updateContents: (id: number, title: string, contents: string) => void,
  deleteNote: (id: number) => void,
}

class MainNote extends React.Component<PropsFromRedux> {
  saveAndExit = (title: string, text: string, tags: string[]) => {
    this.props.setEditing(false)
    this.props.updateContents(this.props.id, title, text)
  }

  discardAndExit = () => {
    this.props.setEditing(false)
  }

  enableEditing = () => {
    this.props.setEditing(true)
  }

  deleteNote = () => {
    this.props.deleteNote(this.props.id)
  }

  render() {
    if (this.props.note != undefined) {
      if (this.props.editing) {
        return (
          <NoteEditor
            key={this.props.note.id}
            note={this.props.note}
            saveAndExit={this.saveAndExit}
            discardAndExit={this.discardAndExit}
          />
        )
      }
      else {
        return (
          <NoteDisplay
            key={this.props.note.id}
            note={this.props.note}
            enableEditing={this.enableEditing}
            deleteNote={this.deleteNote}
          />
        )
      }
    }
    else if (this.props.id != null) {
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
    updateContents: (id: number, title: string, contents: string) =>
      dispatch(updateContents(id, title, contents)),
    deleteNote: (id: number) =>
      dispatch(deleteNote(id))
  }
}

const MainNoteView = connect(mapStateToProps, mapDispatchToProps)(MainNote)
export default MainNoteView