import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Note {
  id: string
  title: string
  content: string
}

interface NotesState {
  notes: Note[]
  selectedNoteId: string | null
  isLoading: boolean
}

interface NotesActions {
  addNote: () => void
  updateNote: (id: string, title: string, content: string) => void
  deleteNote: (id: string) => void
  selectNote: (id: string | null) => void
  setNotes: (notes: Note[]) => void
  setLoading: (loading: boolean) => void
}

type NotesStore = NotesState & NotesActions

export const useNotesStore = create<NotesStore>()(
  persist(
    (set, get) => ({
      // Initial state
      notes: [],
      selectedNoteId: null,
      isLoading: false,

      // Actions
      addNote: () => {
        const newNote: Note = {
          id: Date.now().toString(),
          title: '',
          content: ''
        }
        
        set((state) => ({
          notes: [newNote, ...state.notes],
          selectedNoteId: newNote.id
        }))
      },

      updateNote: (id: string, title: string, content: string) => {
        set((state) => ({
          notes: state.notes.map(note =>
            note.id === id ? { ...note, title, content } : note
          )
        }))
      },

      deleteNote: (id: string) => {
        const state = get()
        const remainingNotes = state.notes.filter(note => note.id !== id)
        
        set({
          notes: remainingNotes,
          selectedNoteId: remainingNotes.length > 0 && state.selectedNoteId === id 
            ? remainingNotes[0].id 
            : state.selectedNoteId === id 
              ? null 
              : state.selectedNoteId
        })
      },

      selectNote: (id: string | null) => {
        set({ selectedNoteId: id })
      },

      setNotes: (notes: Note[]) => {
        set({ notes })
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      }
    }),
    {
      name: 'notar-notes-storage',
      partialize: (state) => ({ 
        notes: state.notes,
        selectedNoteId: state.selectedNoteId 
      }),
    }
  )
)
