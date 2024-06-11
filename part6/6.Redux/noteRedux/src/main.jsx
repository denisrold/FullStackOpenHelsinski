import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from'./reducers/store';

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = ()=> root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
renderApp();
store.subscribe(renderApp);