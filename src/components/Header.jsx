/**
 * Header component - Top navigation bar with search functionality
 */
import React from 'react'
import { Search, Plus, Menu, X } from 'lucide-react'
import { useNotes } from '../context/NotesContext'

const Header = () => {
  const { searchQuery, setSearchQuery, addNote } = useNotes()
  const [isSearchFocused, setIsSearchFocused] = React.useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">N</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              NotesApp
            </h1>
          </div>

          {/* Search Bar */}
          <div className={`flex-1 max-w-md mx-8 transition-all duration-300 ${isSearchFocused ? 'max-w-lg' : ''}`}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`w-full pl-10 pr-4 py-2.5 border rounded-xl transition-all duration-300 ${
                  isSearchFocused 
                    ? 'border-purple-500 ring-2 ring-purple-200 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300'
                } focus:outline-none bg-gray-50`}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => addNote({ title: '', content: '', category: 'personal' })}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>New Note</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
