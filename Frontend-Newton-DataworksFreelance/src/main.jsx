import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import { store } from './store/index.js'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AnimatePresence mode="wait">
        <App />
      </AnimatePresence>
    </Provider>
  </React.StrictMode>,
)

