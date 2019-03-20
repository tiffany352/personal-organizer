import * as React from 'react'
import './EditWidget.css'

export type EditWidgetProps = {
  text: string,
  setText: (newText: string) => void
}

export default class EditWidget extends React.Component<EditWidgetProps> {
  render() {
    const lines = this.props.text.split('\n').length
    return (
      <textarea
        className='EditWidget-textarea'
        rows={Math.max(4, lines)}
        onChange={this.handleChange}
        value={this.props.text}
      />
    )
  }

  handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.props.setText(event.target.value)
  }
}
