import * as React from 'react'
import EditWidget from './EditWidget'
import { Note } from '../../reducers/notes'
import TextInput from './TextInput'
import NoteEditButtons from './NoteEditButtons'
import NoteTagList from './NoteTagList'
import './NoteEditor.css'

export type NoteEditorProps = {
  note: Note,
  saveAndExit: (title: string, text: string, tags: string[]) => void,
  discardAndExit: () => void,
}

type NoteEditorState = {
  text: string,
  title: string,
  tags: string[],
}

export default class NoteEditor extends React.Component<NoteEditorProps, NoteEditorState> {
  state = {
    text: this.props.note.contents,
    title: this.props.note.title,
    tags: this.props.note.tags,
  }

  setText = (text: string) => {
    this.setState({
      text,
    })
  }

  setTitle = (title: string) => {
    this.setState({
      title,
    })
  }

  addTag = (tag: string) => {
    this.setState((prevState) => ({
      tags: prevState.tags.filter((value) => value != tag).concat([tag])
    }))
  }

  deleteTag = (tag: string) => {
    this.setState((prevState) => ({
      tags: prevState.tags.filter((value) => value != tag)
    }))
  }

  saveAndExit = () => {
    this.props.saveAndExit(this.state.title, this.state.text, this.state.tags)
  }

  render() {
    return (
      <div>
        <NoteEditButtons
          saveAndExit={this.saveAndExit}
          discardAndExit={this.props.discardAndExit}
        />
        <TextInput
          text={this.state.title}
          setText={this.setTitle}
          className="NoteEditor-title"
        />
        <NoteTagList
          editable
          tags={this.state.tags}
          addTag={this.addTag}
          deleteTag={this.deleteTag}
          allTags={[]}
        />
        <EditWidget
          text={this.state.text}
          setText={this.setText}
        />
      </div>
    )
  }
}
