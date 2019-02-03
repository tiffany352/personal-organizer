import * as React from 'react'
import Node from './Node'
import InlineView from './InlineView'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierLakesideLight } from 'react-syntax-highlighter/dist/styles/hljs'

export default function NodeView(props: { node: Node }) {
  const node = props.node
  const token = node.token
  const renderedChildren = node.children.map((node) => <NodeView node={node} />)

  switch (token.type) {
    case 'inline':
      const nodes = Node.build(token.children)
      return (
        <>
          {nodes.map((node) => <InlineView node={node} />)}
        </>
      )
    case 'paragraph_open':
      return (
        <p>{renderedChildren}</p>
      )
    case 'heading_open':
      switch (token.tag) {
        case 'h1': return <h1>{renderedChildren}</h1>
        case 'h2': return <h2>{renderedChildren}</h2>
        case 'h3': return <h3>{renderedChildren}</h3>
        case 'h4': return <h4>{renderedChildren}</h4>
        case 'h5': return <h5>{renderedChildren}</h5>
        case 'h6': return <h6>{renderedChildren}</h6>
        default: return <h6>{renderedChildren}</h6>
      }
    case 'bullet_list_open':
      return (
        <ul>{renderedChildren}</ul>
      )
    case 'ordered_list_open':
      return (
        <ol>{renderedChildren}</ol>
      )
    case 'list_item_open':
      if (node.children.length == 1 && node.children[0].token.type == 'paragraph_open') {
        return (
          <li>
            {node.children[0].children.map((node) => <NodeView node={node} />)}
          </li>
        )
      }
      return (
        <li>{renderedChildren}</li>
      )
    case 'container_info_open':
      return (
        <div className="infobox info">{renderedChildren}</div>
      )
    case 'container_warning_open':
      return (
        <div className="infobox warning">{renderedChildren}</div>
      )
    case 'blockquote_open':
      return (
        <blockquote>{renderedChildren}</blockquote>
      )
    case 'fence':
      return (
        <SyntaxHighlighter style={atelierLakesideLight} language={token.info || 'text'}>
          {token.content}
        </SyntaxHighlighter>
      )
    case 'hr':
      return (
        <hr />
      )
    case 'table_open':
      return (
        <table>{renderedChildren}</table>
      )
    case 'thead_open':
      return (
        <thead>{renderedChildren}</thead>
      )
    case 'tbody_open':
      return (
        <tbody>{renderedChildren}</tbody>
      )
    case 'tr_open':
      return (
        <tr>{renderedChildren}</tr>
      )
    case 'th_open':
      return (
        <th>{renderedChildren}</th>
      )
    case 'td_open':
      return (
        <td>{renderedChildren}</td>
      )
    default:
      return (
        <div className="nodeDebug">
          Unknown token: {token.type}
        </div>
      )
  }
}
