import { ThunkResult } from "../reducers"
import setOffline from "./setOffline"

export default function fetchJson(url: string, method: string = 'GET', requestBody?: object): ThunkResult<Promise<any>> {
  return async dispatch => {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': requestBody ? 'application/json' : undefined
        },
        body: requestBody ? JSON.stringify(requestBody) : undefined
      })
      const body = await response.json()

      dispatch(setOffline(false))

      return body
    }
    catch (error) {
      console.log('Network error: ', error)

      dispatch(setOffline(true))
      return null
    }
  }
}
