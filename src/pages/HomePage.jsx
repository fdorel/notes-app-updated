/**
 * HomePage component - Main page displaying all notes with sidebar and search
 */
import React from 'react'
import { 
  FileText, 
  PlusCircle, 
  Search, 
  Filter,
  Grid,
  List
} from 'lucide-react'
import Sidebar from '../components/Sidebar'
import NoteCard from '../components/NoteCard'
import NoteForm from '../components/NoteForm'
import { useNotes } from '../context/NotesContext'

const HomePage = () => {
  const { 
    notes, 
    searchQuery, 
    selectedCategory, 
    isLoading,
    addNote, 
    updateNote, 
    deleteNote,
    getFilteredNotes 
  } = useNotes()

  const [showForm, setShowForm] = React.useState(false)
  const [editingNote, setEditingNote] = React.useState(null)
  const [viewMode, setViewMode] = React.useState('grid') // 'grid' or 'list'

  const filteredNotes = getFilteredNotes()

  const handleAddNote = (noteData) => {
    addNote(noteData)
    setShowForm(false)
  }

  const handleEditNote = (noteId) => {
    const noteToEdit = notes.find(note => note.id === noteId)
    setEditingNote(noteToEdit)
    setShowForm(true)
  }

  const handleUpdateNote = (updatedNote) => {
    updateNote(updatedNote.id, updatedNote)
    setShowForm(false)
    setEditingNote(null)
  }

  const handleDeleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(noteId)
    }
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {selectedCategory === 'all' ? 'All Notes' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
              </h1>
              <p className="text-gray-500 mt-2">
                {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-white rounded-xl p-1 shadow-sm border">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-sm border p-4 mb-6">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => {}} // This would connect to context in full implementation
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500 font-medium">Loading notes...</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredNotes.length === 0 && (
          <div className="flex items-center justify-center h-64 text-center">
            <div>
              <FileText className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No notes found</h3>
              <p className="text-gray-500 mb-4">Create your first note to get started!</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
              >
                Create Note
              </button>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        {!isLoading && filteredNotes.length > 0 && (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
            {filteredNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={() => handleEditNote(note.id)}
                onDelete={() => handleDeleteNote(note.id)}
              />
            ))}
          </div>
        )}

        {/* Add Note Button */}
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center"
        >
          <PlusCircle className="w-8 h-8" />
        </button>
      </main>

      {/* Note Form Modal */}
      {showForm && (
        <NoteForm
          note={editingNote}
          onSave={editingNote ? handleUpdateNote : handleAddNote}
          onCancel={() => {
            setShowForm(false)
            setEditingNote(null)
          }}
        />
      )}
    </div>
  )
}

export default HomePage
