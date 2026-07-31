/**
 * Sidebar component - Category navigation and statistics
 */
import React from 'react'
import { 
  FileText, 
  User, 
  Briefcase, 
  Lightbulb, 
  CheckSquare, 
  Star,
  Trash2,
  BarChart3
} from 'lucide-react'
import { useNotes } from '../context/NotesContext'

const categoryIcons = {
  all: FileText,
  personal: User,
  work: Briefcase,
  ideas: Lightbulb,
  tasks: CheckSquare,
  favorites: Star,
}

const Sidebar = () => {
  const { 
    categories, 
    selectedCategory, 
    setCategory, 
    notes,
    deleteNote 
  } = useNotes()

  // Calculate statistics
  const stats = {
    total: notes.length,
    favorites: notes.filter(n => n.isFavorite).length,
    personal: notes.filter(n => n.category === 'personal').length,
    work: notes.filter(n => n.category === 'work').length,
    ideas: notes.filter(n => n.category === 'ideas').length,
    tasks: notes.filter(n => n.category === 'tasks').length,
  }

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete all notes?')) {
      notes.forEach(note => deleteNote(note.id))
    }
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      {/* Categories */}
      <div className="p-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Categories
        </h3>
        
        <nav className="space-y-2">
          {categories.map(category => {
            const Icon = categoryIcons[category] || FileText
            const count = notes.filter(n => n.category === category).length
            
            return (
              <button
                key={category}
                onClick={() => setCategory(category)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-purple-100 text-purple-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${selectedCategory === category ? 'text-purple-600' : 'text-gray-400'}`} />
                  <span className="font-medium capitalize">{category}</span>
                </div>
                {count > 0 && (
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    selectedCategory === category ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Statistics */}
      <div className="p-6 border-t border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Statistics
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Total Notes</span>
            </div>
            <span className="text-lg font-bold text-purple-700">{stats.total}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-700">Favorites</span>
            </div>
            <span className="text-lg font-bold text-yellow-700">{stats.favorites}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 border-t border-gray-200">
        <button
          onClick={handleDeleteAll}
          disabled={notes.length === 0}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors duration-200 disabled:opacity-50"
        >
          <Trash2 className="w-5 h-5" />
          <span className="font-medium">Delete All</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
