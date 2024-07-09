import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AppProviders from './AppProviders.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
        <AppProviders>
          <App />
        </AppProviders>
)
