import * as React from 'react'
import * as MarkdownIt from 'markdown-it'
import * as MarkdownItContainer from 'markdown-it-container'
import './Markdown.css'

function createContainerRenderer(className: string) {
  return (tokens: any[], idx: number) => {
    if (tokens[idx].nesting === 1) {
      // opening tag
      return `<div class="infobox ${className}">\n`
    } else {
      // closing tag
      return '</div>\n'
    }
  }
}

export default class Markdown extends React.Component {
  render() {
    const md = new MarkdownIt({
      linkify: true,
    })
    md.use(MarkdownItContainer, 'info', {
      render: createContainerRenderer('info')
    })
    md.use(MarkdownItContainer, 'warning', {
      render: createContainerRenderer('warning')
    })

    return (
      <div className='Markdown-root'>
        {
          React.Children.map(this.props.children, (child) => {
            if (typeof child == 'string') {
              return (
                <p dangerouslySetInnerHTML={{ __html: md.render(child) }} />
              )
            }
            return child
          })
        }
      </div>
    )
  }
}
