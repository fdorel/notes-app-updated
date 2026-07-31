/**
 * NoteCard component - Displays individual note with actions
 */
import React from 'react'
import { 
  Star, 
  Trash2, 
  Edit, 
  Calendar, 
  Tag,
  MoreVertical
} from 'lucide-react'
import { useNotes } from '../context/NotesContext'

const NoteCard = ({ note }) => {
  const { updateNote, deleteNote, toggleFavorite } = useNotes()
  const [showActions, setShowActions] = React.useState(false)

  // Color mapping for categories
  const categoryColors = {
    personal: 'bg-blue-100 text-blue-700',
    work: 'bg-green-100 text-green-700',
    ideas: 'bg-yellow-100 text-yellow-700',
    tasks: 'bg-purple-100 text-purple-700',
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Truncate content for preview
  const truncateContent = (content, maxLength = 100) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
              {note.title}
            </h3>
            
            {/* Category Badge */}
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryColors[note.category] || 'bg-gray-100 text-gray-700'}`}>
              <Tag className="w-3 h-3 mr-1" />
              {note.category}
            </span>
          </div>

          {/* Actions Menu */}
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>

            {/* Dropdown Menu */}
            {showActions && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                <button
                  onClick={() => updateNote(note.id, {})} // Trigger edit mode
                  className="w-full px-4 py-2 text-left hover:bg-purple-50 flex items-center space-x-3"
                >
                  <Edit className="w-4 h-4 text-blue-500" />
                  <span>Edit</span>
                </button>
                
                <button
                  onClick={() => toggleFavorite(note.id)}
                  className="w-full px-4 py-2 text-left hover:bg-yellow-50 flex items-center space-x-3"
                >
                  <Star className={`w-4 h-4 ${note.isFavorite ? 'text-yellow-500' : 'text-gray-400'}`} />
                  <span>{note.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                </button>

                <button
                  onClick={() => deleteNote(note.id)}
                  className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center space-x-3"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => toggleFavorite(note.id)}
          className="absolute top-6 right-16 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Star 
            className={`w-5 h-5 ${note.isFavorite ? 'text-yellow-500 fill-current' : 'text-gray-400'}`}
          />
        </button>
      </div>

      {/* Card Content */}
      <div className="px-6 pb-4">
        <p className="text-gray-600 leading-relaxed line-clamp-3">
          {truncateContent(note.content)}
        </p>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(note.createdAt)}</span>
          </div>
          
          {note.updatedAt !== note.createdAt && (
            <span className="text-xs text-gray-400">
              Updated: {formatDate(note.updatedAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default NoteCard
