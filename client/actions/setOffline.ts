export type SetOfflineAction = {
  type: 'setOffline',
  value: boolean
}

export default function setOffline(value: boolean): SetOfflineAction {
  return {
    type: 'setOffline',
    value
  }
}
