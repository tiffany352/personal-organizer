import * as React from 'react'
import { Tag, Icon, AutoComplete, Input } from 'antd'

type NoteTagListPropsEditable = {
  editable: true,
  tags: string[],
  deleteTag: (name: string) => void,
  addTag: (name: string) => void,
  // For autocomplete.
  allTags: string[],
}

type NoteTagListPropsReadonly = {
  tags: string[],
  editable?: false,
}

export type NoteTagListProps = NoteTagListPropsEditable | NoteTagListPropsReadonly

export default class NoteTagList extends React.Component<NoteTagListProps> {
  state = {
    inputVisible: false,
  }

  onSelect = (value: string) => {
    this.setState({
      inputVisible: false
    })
    if (this.props.editable) {
      this.props.addTag(value)
    }
  }

  showInput = () => {
    this.setState({
      inputVisible: true
    })
  }

  hideInput = () => {
    this.setState({
      inputVisible: false
    })
  }

  render() {
    const tags = this.props.tags || []

    if (this.props.editable === true) {
      const props: NoteTagListPropsEditable = this.props

      return (
        <div style={{ margin: '10px 0px' }}>
          {tags.map((tag) => (
            <Tag
              key={tag}
              closable
              onClose={() => props.deleteTag(tag)}
            >
              {tag}
            </Tag>
          ))}

          {!this.state.inputVisible && (
            <Tag style={{ background: '#fff', borderStyle: 'dashed' }} onClick={this.showInput}>
              <Icon type="plus" /> Add Tag
            </Tag>
          )}

          {this.state.inputVisible && <AutoComplete
            dataSource={this.props.allTags}
            onSelect={this.onSelect}
            onBlur={this.hideInput}
            size="small"
            placeholder="Search..."
          >
            <Input
              type="text"
              size="small"
              style={{ width: 78*2 }}
            />
          </AutoComplete>}
        </div>
      )
    }

    return (
      <div style={{ margin: '10px 0px' }}>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    )  
  }
}
