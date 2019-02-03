import * as React from 'react'
import { Button } from 'antd'
import fetchCurrentNote from '../../actions/fetchCurrentNote'
import { connect } from 'react-redux'
import createNote from '../../actions/createNote'
import { AppDispatch } from '../../reducers'

function CreateNoteView(props: { createNote: () => void }) {
  return (
    <Button block={true} size='large' type='primary' onClick={props.createNote}>Create</Button>
  )
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    createNote: async () => {
      const id = await dispatch(createNote())
      dispatch(fetchCurrentNote(id))
    }
  }
}

const CreateNote = connect(null, mapDispatchToProps)(CreateNoteView)
export default CreateNote
