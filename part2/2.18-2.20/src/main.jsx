import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
let API_KEY = await import.meta.env.VITE_API_KEY || "";
ReactDOM.createRoot(document.getElementById('root')).render(<App API_KEY={API_KEY}/>)
