import * as React from 'react'
import Node from './Node'

export default function NodeDebug(props: { node: Node }) {
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
        <>
          <p>Token children: {token.children.length}</p>
          <ul>
            {token.children.map((token) => <li>{JSON.stringify(token)}</li>)}
          </ul>
        </>
      )}
      {children.length > 0 && (
        <>
          <p>Node children: {children.length}</p>
          <ul>
            {children.map((node) => <li><NodeDebug node={node} /></li>)}
          </ul>
        </>
      )}
    </div>
  )
}
