/**
 * Main entry point for the Notes App
 * Initializes React and renders the root component
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { NotesProvider } from './context/NotesContext'
import App from './App'
import './styles/global.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <NotesProvider>
      <App />
    </NotesProvider>
  </React.StrictMode>
)
