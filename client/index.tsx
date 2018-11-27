import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import App from './components/App'
import { devToolsEnhancer } from 'redux-devtools-extension'

const store = createStore(
  rootReducer,
  devToolsEnhancer({})
)

const element = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(element, document.getElementById("root"))
