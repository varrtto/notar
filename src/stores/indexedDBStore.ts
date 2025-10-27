import { create } from 'zustand'
import { type Note } from './notesStore'

interface IndexedDBState {
  isInitialized: boolean
  isLoading: boolean
  error: string | null
}

interface IndexedDBActions {
  initializeDB: () => Promise<void>
  loadNotes: () => Promise<Note[]>
  saveNotes: (notes: Note[]) => Promise<void>
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

type IndexedDBStore = IndexedDBState & IndexedDBActions

const DB_NAME = 'NotarDB'
const DB_VERSION = 1
const NOTES_STORE = 'notes'

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(NOTES_STORE)) {
        db.createObjectStore(NOTES_STORE, { keyPath: 'id' })
      }
    }
  })
}

export const useIndexedDBStore = create<IndexedDBStore>((set) => ({
  // Initial state
  isInitialized: false,
  isLoading: false,
  error: null,

  // Actions
  initializeDB: async () => {
    try {
      set({ isLoading: true, error: null })
      await openDB()
      set({ isInitialized: true, isLoading: false })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to initialize database',
        isLoading: false 
      })
    }
  },

  loadNotes: async (): Promise<Note[]> => {
    try {
      set({ isLoading: true, error: null })
      const db = await openDB()
      const transaction = db.transaction([NOTES_STORE], 'readonly')
      const store = transaction.objectStore(NOTES_STORE)
      
      return new Promise((resolve, reject) => {
        const request = store.getAll()
        
        request.onsuccess = () => {
          set({ isLoading: false })
          resolve(request.result)
        }
        
        request.onerror = () => {
          set({ 
            error: 'Failed to load notes',
            isLoading: false 
          })
          reject(request.error)
        }
      })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load notes',
        isLoading: false 
      })
      return []
    }
  },

  saveNotes: async (notes: Note[]): Promise<void> => {
    try {
      set({ isLoading: true, error: null })
      const db = await openDB()
      const transaction = db.transaction([NOTES_STORE], 'readwrite')
      const store = transaction.objectStore(NOTES_STORE)

      // Clear existing notes
      await new Promise<void>((resolve, reject) => {
        const clearRequest = store.clear()
        clearRequest.onsuccess = () => resolve()
        clearRequest.onerror = () => reject(clearRequest.error)
      })

      // Add all notes
      for (const note of notes) {
        await new Promise<void>((resolve, reject) => {
          const addRequest = store.add(note)
          addRequest.onsuccess = () => resolve()
          addRequest.onerror = () => reject(addRequest.error)
        })
      }

      set({ isLoading: false })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to save notes',
        isLoading: false 
      })
    }
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading })
  },

  setError: (error: string | null) => {
    set({ error })
  }
}))
