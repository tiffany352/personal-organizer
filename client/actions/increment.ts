export type IncrementAction = {
  type: 'increment',
}

export default function increment(): IncrementAction {
  return {
    type: 'increment'
  }
}
