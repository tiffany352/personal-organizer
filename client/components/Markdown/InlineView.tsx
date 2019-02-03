import * as React from 'react'
import Node from './Node'

export default function InlineView(props: {node: Node}) {
  const node = props.node
  const token = node.token

  if (token.type == 'text') {
    return (
      <>{token.content}</>
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
    case 'code_inline':
    return (
      <span className="inline-code">
        {token.content}
      </span>
    )
    default:
      return (
        <div className="nodeDebug">
          Unknown inline element {token.type}
        </div>
      )
  }
}
