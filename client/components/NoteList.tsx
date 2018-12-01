import * as React from 'react'
import NoteView from "./NoteView"
import { Note } from '../reducers/notes'
import { connect } from 'react-redux'
import { AppState } from '../reducers'
import { Tree, Icon } from 'antd'

export function NoteListView(props: { notes: Note[] }) {
  return (
    <Tree showIcon>
      {props.notes.map((note) => (
        <Tree.TreeNode
          key={note.id.toString()}
          title={note.title}
          icon={<Icon type='book' />}
        />
      ))}
    </Tree>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    notes: state.notes.slice(0, 20)
  }
}

const NoteList = connect(mapStateToProps)(NoteListView)
export default NoteList
