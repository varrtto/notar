import { useEffect, useRef } from 'react'
import { useIndexedDBStore } from './indexedDBStore'
import { useNotesStore } from './notesStore'

export const useNotesSync = () => {
  const { 
    notes, 
    selectedNoteId, 
    addNote, 
    updateNote, 
    deleteNote, 
    selectNote, 
    setNotes 
  } = useNotesStore()
  
  const { 
    isInitialized, 
    isLoading, 
    error, 
    initializeDB, 
    loadNotes, 
    saveNotes 
  } = useIndexedDBStore()

  const hasLoadedInitialNotes = useRef(false)

  // Initialize IndexedDB on mount
  useEffect(() => {
    if (!isInitialized) {
      initializeDB()
    }
  }, [isInitialized, initializeDB])

  // Load notes from IndexedDB when initialized (only once)
  useEffect(() => {
    if (isInitialized && !hasLoadedInitialNotes.current) {
      hasLoadedInitialNotes.current = true
      loadNotes().then((loadedNotes) => {
        if (loadedNotes.length > 0) {
          setNotes(loadedNotes)
        }
      })
    }
  }, [isInitialized, loadNotes, setNotes])

  // Save notes to IndexedDB whenever notes change
  useEffect(() => {
    if (isInitialized && hasLoadedInitialNotes.current) {
      saveNotes(notes)
    }
  }, [notes, isInitialized, saveNotes])

  return {
    notes,
    selectedNoteId,
    isLoading,
    error,
    addNote,
    updateNote,
    deleteNote,
    selectNote
  }
}
