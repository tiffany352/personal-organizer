import * as React from 'react'

export type TextInputProps = {
  text: string,
  className: string,
  setText: (text: string) => void,
}

export default class TextInput extends React.Component<TextInputProps> {
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setText(event.target.value)
  }

  render() {
    return (
      <input
        className={this.props.className}
        type="text"
        value={this.props.text}
        onChange={this.handleChange}
      />
    )
  }
}
