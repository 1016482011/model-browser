import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Router from './Router'
import configureStore from './store/configureStore'
import * as serviceWorker from './serviceWorker'
import 'normalize.css'
import './styles/index.less'

ReactDOM.render(
  <Provider store={configureStore}>
    <Router />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
