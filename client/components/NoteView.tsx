import * as React from 'react'
import { Spin, Button, Row, Col } from 'antd'
import { Note } from '../reducers/notes'
import EditWidget from './EditWidget'

export type NoteViewProps = {
  note: Note,
  editing: boolean,
  setEditing: (value: boolean) => void,
  updateContents: (id: number, contents: string) => void
}

export default class NoteView extends React.Component<NoteViewProps> {
  state = {
    text: this.props.note.contents
  }

  enableEditing = () =>
    this.props.setEditing(true)
  
  saveAndExit = () => {
    this.props.updateContents(this.props.note.id, this.state.text)
    this.props.setEditing(false)
  }
  
  discardAndExit = () =>
    this.props.setEditing(false)

  render() {
    const {note, editing, setEditing} = this.props

    let contents
    if (note.contents) {
      if (editing) {
        contents = (
          <EditWidget text={this.state.text} setText={this.setText} />
        )
      }
      else {
        contents = (
          <React.Fragment>
            <p>{note.contents}</p>
            <span>{new Date(note.updatedAt || note.createdAt).toString()}</span>
          </React.Fragment>
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
        <Row align='middle'>
          <Col span={20}>
            <h1>{note.title||'Untitled'}</h1>
          </Col>
          <Col>
            {editing && <Button icon='save' onClick={this.saveAndExit}>Save</Button>}
            {editing && <Button icon='stop' onClick={this.discardAndExit}>Cancel</Button>}
            {!editing && <Button icon='edit' onClick={this.enableEditing}>Edit</Button>}
          </Col>
        </Row>
        {contents}
      </React.Fragment>
    )
  }

  setText = (text: string) => {
    this.setState({
      text: text
    })
  }
}
