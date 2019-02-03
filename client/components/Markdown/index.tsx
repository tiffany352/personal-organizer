import * as React from 'react'
import * as MarkdownIt from 'markdown-it'
import * as MarkdownItContainer from 'markdown-it-container'
import Node from './Node'
import NodeDebug from './NodeDebug'
import NodeView from './NodeView'
import './Markdown.css'

export default class Markdown extends React.Component {
  render() {
    const md = new MarkdownIt({
      linkify: true,
    })
    md.use(MarkdownItContainer, 'info')
    md.use(MarkdownItContainer, 'warning')

    return (
      <div className='Markdown-root'>
        {
          React.Children.map(this.props.children, (child) => {
            if (typeof child == 'string') {
              const tokens = md.parse(child, {})
              const nodes = Node.build(tokens)
              const debugChildren = nodes.map((node) => <NodeDebug node={node} />)
              const children = nodes.map((node) => <NodeView node={node} />)

              return (
                <>
                  {children}
                </>
              )
            }
            return child
          })
        }
      </div>
    )
  }
}
