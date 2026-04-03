import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { store } from './store/index.js'
import App from './App.jsx'
import './index.css'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

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
