/**
 * App component - The root of our application
 * Wraps the HomePage with NotesContext provider
 */
import React from 'react'
import { NotesProvider } from './context/NotesContext'
import HomePage from './pages/HomePage'
import Header from './components/Header'

function App() {
  return (
    <NotesProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-16">
          <HomePage />
        </main>
      </div>
    </NotesProvider>
  )
}

export default App
