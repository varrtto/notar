import { useNotesSync } from '../stores/useNotesSync'
import { NotesList } from './NotesList'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { notes, selectedNoteId, selectNote, deleteNote } = useNotesSync()

  interface LexicalNode {
    text?: string
    children?: LexicalNode[]
    [key: string]: unknown
  }

  const getPreviewText = (content: string): string => {
    if (!content) return ''
    try {
      const parsed = JSON.parse(content)
      // Extract text content from Lexical editor state
      const extractText = (node: LexicalNode): string => {
        if (node.text) return node.text
        if (node.children) {
          return node.children.map(extractText).join('')
        }
        return ''
      }
      // Handle both old format (root node) and new format (editor state)
      if (parsed.root) {
        return extractText(parsed.root)
      } else if (parsed.children) {
        return extractText(parsed)
      }
      return ''
    } catch {
      return content
    }
  }

  return (
    <>
      {/* Sidebar */}
      <div className={`
        fixed md:relative inset-y-0 left-0 top-[89px] md:top-0 z-50 md:z-auto
        w-full md:w-[300px] bg-gray-50/90 border-r border-gray-200 overflow-y-auto pt-4
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <NotesList
          notes={notes}
          selectedNoteId={selectedNoteId}
          onSelectNote={(id) => {
            selectNote(id)
            onClose() // Close sidebar on mobile when note is selected
          }}
          onDeleteNote={deleteNote}
          getPreviewText={getPreviewText}
        />
      </div>
    </>
  )
}