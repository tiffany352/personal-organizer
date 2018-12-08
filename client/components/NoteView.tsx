import * as React from 'react'
import { Spin, Button, Popconfirm } from 'antd'
import { Note } from '../reducers/notes'
import EditWidget from './EditWidget'
import Markdown from './Markdown'
import './NoteView.css'

export type NoteViewProps = {
  note: Note,
  editing: boolean,
  setEditing: (value: boolean) => void,
  updateContents: (id: number, title: string, contents: string) => void,
  deleteNote: (id: number) => void
}

export default class NoteView extends React.Component<NoteViewProps> {
  state = {
    text: this.props.note.contents,
    title: this.props.note.title
  }

  enableEditing = () =>
    this.props.setEditing(true)
  
  saveAndExit = () => {
    this.props.updateContents(this.props.note.id, this.state.title, this.state.text)
    this.props.setEditing(false)
  }
  
  discardAndExit = () =>
    this.props.setEditing(false)

  deleteNote = () => {
    this.props.deleteNote(this.props.note.id)
  }

  render() {
    const {note, editing, setEditing} = this.props

    let contents
    if (note.contents != undefined) {
      if (editing) {
        contents = (
          <EditWidget text={this.state.text} setText={this.setText} />
        )
      }
      else {
        contents = (
          <Markdown>
            {note.contents}
            <span>{new Date(note.updatedAt || note.createdAt).toString()}</span>
          </Markdown>
        )
      }
    }
    else {
      contents = (
        <div>
          <Spin />
        </div>
      )
    }
    return (
      <React.Fragment>
        <Button.Group>
          {editing && <Button icon='save' onClick={this.saveAndExit}>Save</Button>}
          {editing && <Button icon='stop' onClick={this.discardAndExit}>Cancel</Button>}
          {!editing && <Button icon='edit' onClick={this.enableEditing}>Edit</Button>}
          {!editing && <Popconfirm title="Permanently delete this note?" onConfirm={this.deleteNote}>
            <Button icon='delete'>Delete</Button>
          </Popconfirm>}
        </Button.Group>
        {editing && <input
          className="NoteView-title"
          type="text"
          value={this.state.title}
          onChange={this.titleChanged}
        />}
        {!editing && <h1>{note.title||'Untitled'}</h1>}
        {contents}
      </React.Fragment>
    )
  }

  setText = (text: string) => {
    this.setState({
      text: text
    })
  }

  titleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value
    })
  }
}
