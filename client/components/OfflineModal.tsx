import * as React from 'react'
import { Alert } from 'antd'
import { AppState } from '../reducers'
import { connect } from 'react-redux'

function OfflineModalView(props: { currentlyOffline: boolean }) {
  return props.currentlyOffline && (
    <Alert
      message="Request failed, are you offline?"
      type="error"
      banner
    >
      <p>You might be offline.</p>
    </Alert>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    currentlyOffline: state.currentlyOffline
  }
}

const OfflineModal = connect(mapStateToProps)(OfflineModalView)
export default OfflineModal
