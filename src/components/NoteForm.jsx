/**
 * NoteForm component - Modal form for creating and editing notes
 */
import React, { useState, useEffect } from 'react'
import { X, Save, Tag, Calendar } from 'lucide-react'

const categories = [
  { value: 'personal', label: 'Personal', color: 'bg-blue-500' },
  { value: 'work', label: 'Work', color: 'bg-green-500' },
  { value: 'ideas', label: 'Ideas', color: 'bg-yellow-500' },
  { value: 'tasks', label: 'Tasks', color: 'bg-purple-500' },
]

const NoteForm = ({ note, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'personal',
  })
  const [errors, setErrors] = useState({})

  // Load existing note data when editing
  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title || '',
        content: note.content || '',
        category: note.category || 'personal',
      })
    } else {
      resetForm()
    }
  }, [note])

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: 'personal',
    })
    setErrors({})
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    onSave({
      ...formData,
      id: note?.id,
      createdAt: note?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              {note ? 'Edit Note' : 'Create New Note'}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Title Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter note title..."
              className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                errors.title ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-purple-500 focus:ring-purple-200'
              } focus:outline-none focus:ring-2`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Category Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map(category => (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => handleInputChange('category', category.value)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                    formData.category === category.value
                      ? 'border-purple-500 bg-purple-50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${category.color}`} />
                    <span className="font-medium text-sm">{category.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Write your note here..."
              rows={6}
              className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 resize-none ${
                errors.content ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-purple-500 focus:ring-purple-200'
              } focus:outline-none focus:ring-2`}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-500">{errors.content}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              {note ? 'Update Note' : 'Create Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NoteForm
