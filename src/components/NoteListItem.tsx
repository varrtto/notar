import { Trash2 } from 'lucide-react'

interface Note {
  id: string
  title: string
  content: string
}

interface NoteListItemProps {
  note: Note
  isSelected: boolean
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  getPreviewText: (content: string) => string
}

export function NoteListItem({ 
  note, 
  isSelected, 
  onSelect, 
  onDelete, 
  getPreviewText 
}: NoteListItemProps) {
  return (
    <li
      className={`p-4 mx-4 mb-2 border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-200 relative flex items-start rounded-lg group ${
        isSelected 
          ? 'bg-blue-600 text-white shadow-md border-blue-500' 
          : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm'
      }`}
      onClick={() => onSelect(note.id)}
    >
      <div className="flex-1 mr-8">
        <h3 className={`m-0 text-base font-medium ${
          isSelected ? 'text-white' : 'text-gray-900 dark:text-gray-100'
        }`}>
          {note.title.slice(0, 20) || 'Untitled'}
        </h3>
        {getPreviewText(note.content) && getPreviewText(note.content).length > 0 && <p className={`m-0 text-sm mt-2 leading-relaxed ${
          isSelected ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'
        }`}>
          {getPreviewText(note.content).slice(0, 60)}
          {getPreviewText(note.content).length > 60 ? '...' : ''}
        </p>}
      </div>
      <button
        className={`absolute top-3 right-3 bg-transparent border-none cursor-pointer p-1.5 rounded-md md:opacity-0 group-hover:opacity-100 transition-all duration-200 ${
          isSelected 
            ? 'text-blue-200 hover:bg-blue-700 hover:text-white' 
            : 'text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'
        }`}
        onClick={(e) => {
          e.stopPropagation()
          onDelete(note.id)
        }}
        title="Delete note"
      >
        <Trash2 size={14} />
      </button>
    </li>
  )
}
