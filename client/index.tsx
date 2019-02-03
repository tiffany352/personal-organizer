import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer, { AppAction, AppState } from './reducers'
import App from './components/Connection/App'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import fetchNotesList from './actions/fetchNotesList'
import 'antd/dist/antd.css'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<AppState, AppAction>))
)

const element = (
  <Provider store={store}>
    <App />
  </Provider>
)

store.dispatch(fetchNotesList())

ReactDOM.render(element, document.getElementById("root"))
