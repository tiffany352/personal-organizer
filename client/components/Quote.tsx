import * as React from 'react'
import { connect } from 'react-redux'
import { AppState, AppDispatch } from '../reducers'
import fetchQuote from '../actions/fetchQuote'
import './Quote.css'

export type QuoteProps = {
  value: string,
  fetchQuote: () => void,
}

export class QuoteView extends React.Component<QuoteProps> {
  render() {
    return (
      <div>
        <blockquote className='QuoteView-blockquote'>“{this.props.value}”</blockquote>
        <input type='button' onClick={this.handleClick} value="Refresh" />
      </div>
    )
  }

  handleClick = (event: React.MouseEvent) => {
    this.props.fetchQuote()
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    value: state.quote,
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    fetchQuote: () =>
      dispatch(fetchQuote()),
  }
}

const Quote = connect(mapStateToProps, mapDispatchToProps)(QuoteView)
export default Quote
