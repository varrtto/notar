import { Menu, Plus, XIcon } from 'lucide-react'
import { useNotesSync } from '../stores/useNotesSync'

interface HeaderProps {
  onToggleSidebar: () => void
  isSidebarOpen: boolean
}

export function Header({ onToggleSidebar, isSidebarOpen }: HeaderProps) {
  const { addNote, isLoading } = useNotesSync()

  return (  
    <header className="flex justify-between items-center px-4 md:px-8 py-6 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? <XIcon size={20} className="text-gray-600" /> : <Menu size={20} className="text-gray-600" />}
        </button>
        <h1 className="m-0 text-2xl font-bold text-gray-900 tracking-tight">Notar</h1>
      </div>
      <button 
        onClick={addNote} 
        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white border-none rounded-lg cursor-pointer text-sm font-medium hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        <Plus size={16} /> Add Note
      </button>
    </header>
  )
}
