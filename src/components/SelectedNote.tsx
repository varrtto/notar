import { useNotesSync } from '../stores/useNotesSync'
import { NoteEditor } from './NoteEditor'

interface Note {
  id: string
  title: string
  content: string
}

interface SelectedNoteProps {
  note: Note
}

export function SelectedNote({ note }: SelectedNoteProps) {
  const { updateNote } = useNotesSync()

  return (
    <div className="mx-auto">
      <div className="px-8 py-6 border-b border-gray-200 bg-white">
        <input
          type="text"
          value={note.title}
          onChange={(e) => updateNote(note.id, e.target.value, note.content)}
          className="w-full text-4xl font-bold border-none outline-none bg-transparent text-gray-900 placeholder-gray-400 transition-colors focus:text-gray-900"
          placeholder="Untitled Note"
          tabIndex={1}
        />
      </div>
      <div className="bg-white">
        <NoteEditor
          onChange={(content) => updateNote(note.id, note.title, content)}
          content={note.content}
        />
      </div>
    </div>
  )
}
