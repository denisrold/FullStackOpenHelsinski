import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from '../redux/store.js';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from '../components/Footer/Footer.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
   <Provider store={store}>
     <App />
     {window.location.pathname !=='/'&&<Footer/>}
    </Provider>
  </Router>
)
