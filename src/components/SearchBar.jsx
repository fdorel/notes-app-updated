/**
 * SearchBar component - Advanced search functionality with filters
 */
import React from 'react'
import { Search, Filter, X } from 'lucide-react'
import { useNotes } from '../context/NotesContext'

const SearchBar = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setCategory } = useNotes()
  const [showFilters, setShowFilters] = React.useState(false)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      {/* Search Input */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes by title or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-3 rounded-xl border transition-colors ${
            showFilters ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="flex items-center space-x-3 overflow-x-auto pb-2">
          <span className="text-sm font-medium text-gray-600 mr-2">Filter by:</span>
          
          {['all', 'personal', 'work', 'ideas', 'tasks'].map(category => (
            <button
              key={category}
              onClick={() => setCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className="mt-4 text-sm text-gray-500">
        Showing results for: "{searchQuery || 'all notes'}" • {selectedCategory !== 'all' ? `in ${selectedCategory}` : ''}
      </div>
    </div>
  )
}

export default SearchBar
