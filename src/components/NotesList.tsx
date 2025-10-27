import { useNotesSync } from '../stores/useNotesSync'
import { NoteListItem } from './NoteListItem'

interface Note {
  id: string
  title: string
  content: string
}

interface NotesListProps {
  notes: Note[]
  selectedNoteId: string | null
  onSelectNote: (id: string) => void
  onDeleteNote: (id: string) => void
  getPreviewText: (content: string) => string
}

export function NotesList({ 
  notes, 
  selectedNoteId, 
  onSelectNote, 
  onDeleteNote, 
  getPreviewText 
}: NotesListProps) {
  const { addNote, isLoading } = useNotesSync()
  if (notes.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-sm">No notes yet</p>
        <button disabled={isLoading} onClick={addNote} className="text-xs text-gray-400 mt-1 hover:underline">Create your first note to get started</button>
      </div>
    )
  }

  return (
    <ul className="list-none p-0 m-0">
      {notes.map(note => (
        <NoteListItem
          key={note.id}
          note={note}
          isSelected={selectedNoteId === note.id}
          onSelect={onSelectNote}
          onDelete={onDeleteNote}
          getPreviewText={getPreviewText}
        />
      ))}
    </ul>
  )
}
