import { Token } from './Token'

export default class Node {
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
