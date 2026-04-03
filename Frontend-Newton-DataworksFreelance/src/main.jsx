import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { store } from './store/index.js'
import App from './App.jsx'
import './index.css'

// Resolve base API URL with priority:
// 1. VITE_API_BASE_URL (set by environment; e.g., Vercel)
// 2. Local dev (localhost:5173) -> local backend http://localhost:5000
// 3. Production default (Render backend)
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) return import.meta.env.VITE_API_BASE_URL
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000'
  }
  return 'https://dataworks-platform.onrender.com'
}
axios.defaults.baseURL = getApiBaseUrl()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AnimatePresence mode="wait">
        <App />
      </AnimatePresence>
    </Provider>
  </React.StrictMode>,
)

// Frontend deployed at dataworks-platform.vercel.app
