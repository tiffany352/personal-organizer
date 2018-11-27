import * as React from 'react'
import { connect } from 'react-redux'
import { State } from '../reducers'
import increment from '../actions/increment'
import { Dispatch } from 'redux'

export type CounterProps = {
  value: number,
  increment: () => void,
}

export class Counter extends React.Component<CounterProps> {
  render() {
    return (
      <div>
        <div>value: {this.props.value}</div>
        <input type='button' onClick={this.handleClick} value="Increment" />
      </div>
    )
  }

  handleClick = (event: React.MouseEvent) => {
    this.props.increment()
  }
}

const mapStateToProps = (state: State) => {
  return {
    value: state.counter,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    increment: () =>
      dispatch(increment()),
  }
}

const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter)
export default ConnectedCounter
