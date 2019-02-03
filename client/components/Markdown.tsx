import * as React from 'react'
import * as MarkdownIt from 'markdown-it'
import * as MarkdownItContainer from 'markdown-it-container'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierLakesideLight } from 'react-syntax-highlighter/dist/styles/hljs'
import './Markdown.css'

// Required since it's not a publicly exposed type in markdown-it
type Token = {
  attrGet: (name: string) => string | null;
  attrIndex: (name: string) => number;
  attrJoin: (name: string, value: string) => void;
  attrPush: (attrData: string[]) => void;
  attrSet: (name: string, value: string) => void;

  attrs: string[][];
  block: boolean;
  children: Token[];
  content: string;
  hidden: boolean;
  info: string;
  level: number;
  map: number[];
  markup: string;
  meta: any;
  nesting: number;
  tag: string;
  type: string;
}

class Node {
  constructor(token: Token) {
    this.token = token
    this.children = []
  }

  children: Node[];
  token: Token;

  static build(tokens: Token[]): Node[] {
    const output: Node[] = []
    const stack = []

    for (let i = 0; i < tokens.length; i++) {
      const array = stack.length > 0 ? stack[stack.length - 1].children : output
      const token = tokens[i]
      switch (token.nesting) {
        case 0:
          array.push(new Node(token))
          break
        case 1:
          const node = new Node(token)
          array.push(node)
          stack.push(node)
          break
        case -1:
          stack.pop()
          break
      }
    }

    return output
  }
}

type NodeViewProps = {
  node: Node
}

function InlineView(props: {node: Node}) {
  const node = props.node
  const token = node.token

  if (token.type == 'text') {
    return (
      <React.Fragment>{token.content}</React.Fragment>
    )
  }

  const renderedChildren = node.children.map((node) => <InlineView node={node} />)

  switch (token.type) {
    case 'strong_open':
      return (
        <strong>{renderedChildren}</strong>
      )
    case 'em_open':
      return (
        <em>{renderedChildren}</em>
      )
    case 's_open':
      return (
        <s>{renderedChildren}</s>
      )
    case 'link_open':
      return (
        <a href={token.attrGet('href')}>{renderedChildren}</a>
      )
    case 'softbreak':
      return (
        <wbr />
      )
    case 'image':
      return (
        <img
          src={token.attrGet('src')}
          alt={token.attrGet('alt')}
          title={token.attrGet('alt')}
        />
      )
    default:
      return (
        <div className="nodeDebug">
          Unknown inline element {token.type}
        </div>
      )
  }
}

function NodeView(props: NodeViewProps) {
  const node = props.node
  const token = node.token
  const renderedChildren = node.children.map((node) => <NodeView node={node} />)

  switch (token.type) {
    case 'inline':
      const nodes = Node.build(token.children)
      return (
        <React.Fragment>
          {nodes.map((node) => <InlineView node={node} />)}
        </React.Fragment>
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
      if (true ||token.info) {
        return (
          <SyntaxHighlighter style={atelierLakesideLight} language={token.info || 'text'}>
            {token.content}
          </SyntaxHighlighter>
        )
      }
      else {
        return (
          <pre>{token.content}</pre>
        )
      }
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

function NodeDebug(props: NodeViewProps) {
  const node = props.node
  const token = node.token
  const children = node.children

  let desc
  switch (token.nesting) {
    case -1:
      desc = 'closing'
      break
    case 0:
      desc = 'standalone'
      break
    case 1:
      desc = 'opening'
      break
  }
  return (
    <div className="nodeDebug" title={JSON.stringify(token)}>
      <p>{token.type} ({desc})</p>
      {token.content && <p>content: {token.content}</p>}
      {token.children && token.children.length > 0 && (
        <React.Fragment>
          <p>Token children: {token.children.length}</p>
          <ul>
            {token.children.map((token) => <li>{JSON.stringify(token)}</li>)}
          </ul>
        </React.Fragment>
      )}
      {children.length > 0 && (
        <React.Fragment>
          <p>Node children: {children.length}</p>
          <ul>
            {children.map((node) => <li><NodeDebug node={node} /></li>)}
          </ul>
        </React.Fragment>
      )}
    </div>
  )
}

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
                <React.Fragment>
                  {children}
                </React.Fragment>
              )
            }
            return child
          })
        }
      </div>
    )
  }
}
