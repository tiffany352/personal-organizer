import * as MarkdownIt from 'markdown-it'
import { Token } from './Token'

export type TaskListOpts = {}

export default function taskListPlugin(md: MarkdownIt, options: TaskListOpts) {
  md.core.ruler.after('inline', 'github-task-lists', function(state) {
    const tokens = state.tokens
    for (let i = 2; i < tokens.length; i++) {
      if (isTodoItem(tokens, i)) {
        todoify(tokens[i], state.Token)
        attrSet(tokens[i-2], 'class', 'task-list-item')
        attrSet(tokens[parentToken(tokens, i-2)], 'class', 'contains-task-list')
      }
    }
  })
}

function attrSet(token: Token, name: string, value: string) {
  const index = token.attrIndex(name)
  const attr = [name, value]

  if (index < 0) {
    token.attrPush(attr)
  } else {
    token.attrs[index] = attr
  }
}

function parentToken(tokens: Token[], index: number) {
  const targetLevel = tokens[index].level - 1
  for (let i = index - 1; i >= 0; i--) {
    if (tokens[i].level === targetLevel) {
      return i
    }
  }
  return -1
}

function isTodoItem(tokens: Token[], index: number) {
  return isInline(tokens[index]) &&
         isParagraph(tokens[index - 1]) &&
         isListItem(tokens[index - 2]) &&
         startsWithTodoMarkdown(tokens[index])
}

function todoify(token: Token, TokenConstructor: any) {
  token.children.unshift(makeCheckbox(token, TokenConstructor))
  token.children[1].content = token.children[1].content.slice(3)
  token.content = token.content.slice(3)
}

function makeCheckbox(token: Token, TokenConstructor: any) {
  const checkbox = new TokenConstructor('checkbox', '', 0)
  if (token.content.indexOf('[ ] ') === 0) {
    checkbox.content = 'false'
  } else if (token.content.indexOf('[x] ') === 0 || token.content.indexOf('[X] ') === 0) {
    checkbox.content = 'true'
  }
  return checkbox
}

const isInline = (token: Token) => token.type === 'inline'
const isParagraph = (token: Token) => token.type === 'paragraph_open'
const isListItem = (token: Token) => token.type === 'list_item_open'

const startsWithTodoMarkdown = (token: Token) =>
  // leading whitespace in a list item is already trimmed off by markdown-it
  token.content.indexOf('[ ] ') === 0 ||
  token.content.indexOf('[x] ') === 0 ||
  token.content.indexOf('[X] ') === 0
