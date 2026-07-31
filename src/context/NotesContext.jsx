/**
 * NotesContext - Provides global state management for notes
 * Handles all CRUD operations and filtering functionality
 */
import React, { createContext, useContext, useState, useEffect } from 'react'
import { NoteService } from '../services/noteService'

// Create context with default values
const NotesContext = createContext({
  notes: [],
  categories: [],
  selectedCategory: 'all',
  searchQuery: '',
  isLoading: true,
  addNote: () => {},
  updateNote: () => {},
  deleteNote: () => {},
  toggleFavorite: () => {},
  setCategory: () => {},
  setSearchQuery: () => {},
  setSelectedCategory: () => {},
})

// Custom hook to use notes context
export const useNotes = () => {
  return useContext(NotesContext)
}

/**
 * NotesProvider component - Wraps the application with note state management
 */
export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([])
  const [categories, setCategories] = useState(['all', 'personal', 'work', 'ideas', 'tasks'])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Load notes from local storage on mount
  useEffect(() => {
    loadNotes()
  }, [])

  /**
   * Load all notes from local storage
   */
  const loadNotes = async () => {
    try {
      const savedNotes = await NoteService.getAllNotes()
      setNotes(savedNotes)
    } catch (error) {
      console.error('Error loading notes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Add a new note to the collection
   */
  const addNote = async (noteData) => {
    try {
      const newNote = await NoteService.createNote(noteData)
      setNotes(prev => [newNote, ...prev])
    } catch (error) {
      console.error('Error adding note:', error)
    }
  }

  /**
   * Update an existing note
   */
  const updateNote = async (id, updates) => {
    try {
      const updatedNote = await NoteService.updateNote(id, updates)
      setNotes(prev => prev.map(note => 
        note.id === id ? updatedNote : note
      ))
    } catch (error) {
      console.error('Error updating note:', error)
    }
  }

  /**
   * Delete a note by ID
   */
  const deleteNote = async (id) => {
    try {
      await NoteService.deleteNote(id)
      setNotes(prev => prev.filter(note => note.id !== id))
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  /**
   * Toggle favorite status of a note
   */
  const toggleFavorite = async (id) => {
    try {
      const note = notes.find(n => n.id === id)
      if (!note) return
      
      await updateNote(id, { isFavorite: !note.isFavorite })
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  /**
   * Get filtered and searched notes based on current state
   */
  const getFilteredNotes = () => {
    let filtered = [...notes]

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(note => note.category === selectedCategory)
    }

    // Search through title and content
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
      )
    }

    return filtered
  }

  // Context value object
  const value = {
    notes,
    categories,
    selectedCategory,
    searchQuery,
    isLoading,
    addNote,
    updateNote,
    deleteNote,
    toggleFavorite,
    setCategory: setSelectedCategory,
    setSearchQuery,
    getFilteredNotes,
  }

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  )
}
