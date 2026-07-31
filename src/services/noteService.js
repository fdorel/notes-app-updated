/**
 * NoteService - Handles all data operations for notes
 * Provides CRUD methods and localStorage management
 */

const STORAGE_KEY = 'notes-app-data';

export class NoteService {
  /**
   * Generate a unique ID for new notes
   */
  static generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Get all notes from localStorage
   */
  static async getAllNotes() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting notes:', error);
      return [];
    }
  }

  /**
   * Create a new note and save to localStorage
   */
  static async createNote(noteData) {
    try {
      const notes = await this.getAllNotes();
      
      const newNote = {
        id: this.generateId(),
        ...noteData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isFavorite: false,
      };

      notes.unshift(newNote); // Add to beginning of array
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));

      return newNote;
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  }

  /**
   * Update an existing note
   */
  static async updateNote(id, updates) {
    try {
      const notes = await this.getAllNotes();
      
      const index = notes.findIndex(note => note.id === id);
      if (index === -1) throw new Error('Note not found');

      notes[index] = {
        ...notes[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      return notes[index];
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  }

  /**
   * Delete a note by ID
   */
  static async deleteNote(id) {
    try {
      const notes = await this.getAllNotes();
      
      const filteredNotes = notes.filter(note => note.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredNotes));

      return true;
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  }

  /**
   * Get a single note by ID
   */
  static async getNoteById(id) {
    try {
      const notes = await this.getAllNotes();
      return notes.find(note => note.id === id) || null;
    } catch (error) {
      console.error('Error getting note:', error);
      throw error;
    }
  }

  /**
   * Search notes by query string
   */
  static async searchNotes(query) {
    try {
      const notes = await this.getAllNotes();
      const searchTerm = query.toLowerCase();
      
      return notes.filter(note => 
        note.title.toLowerCase().includes(searchTerm) ||
        note.content.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      console.error('Error searching notes:', error);
      throw error;
    }
  }

  /**
   * Get notes by category
   */
  static async getNotesByCategory(category) {
    try {
      const notes = await this.getAllNotes();
      return notes.filter(note => note.category === category);
    } catch (error) {
      console.error('Error getting notes by category:', error);
      throw error;
    }
  }

  /**
   * Clear all notes from storage
   */
  static async clearAllNotes() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing notes:', error);
      throw error;
    }
  }
}
