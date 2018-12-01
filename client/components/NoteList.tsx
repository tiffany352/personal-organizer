import * as React from 'react'
import { Note } from '../reducers/notes'
import { connect } from 'react-redux'
import { AppState, AppDispatch } from '../reducers'
import { Tree, Icon } from 'antd'
import fetchCurrentNote from '../actions/fetchCurrentNote'

export type NoteListProps = {
  notes: Note[],
  currentNote: number|null,
  setCurrentNote: (id: number|null) => void
}

export function NoteListView(props: NoteListProps) {
  return (
    <Tree
      showIcon
      onSelect={
        (selectedKeys) => props.setCurrentNote(parseInt(selectedKeys[0]))
      }
      selectedKeys={props.currentNote ? [props.currentNote.toString()] : []}
    >
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
    notes: state.notes.sort((a,b) => b.updatedAt - a.updatedAt).slice(0, 20),
    currentNote: state.currentNote
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setCurrentNote: (id: number|null) => {
      dispatch(fetchCurrentNote(id))
    }
  }
}

const NoteList = connect(mapStateToProps, mapDispatchToProps)(NoteListView)
export default NoteList
