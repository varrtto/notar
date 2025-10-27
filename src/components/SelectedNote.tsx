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
      <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <input
          type="text"
          value={note.title}
          onChange={(e) => updateNote(note.id, e.target.value, note.content)}
          className="w-full text-4xl font-bold border-none outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors focus:text-gray-900 dark:focus:text-white"
          placeholder="Untitled Note"
          tabIndex={1}
          autoFocus
        />
      </div>
      <div className="bg-white dark:bg-gray-900">
        <NoteEditor
          onChange={(content) => updateNote(note.id, note.title, content)}
          content={note.content}
        />
      </div>
    </div>
  )
}
