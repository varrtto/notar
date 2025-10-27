import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { FORMAT_TEXT_COMMAND, type TextFormatType } from 'lexical'
import { Bold, Code, Italic, Underline } from 'lucide-react'
import { useCallback } from 'react'

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext()

  const formatText = useCallback((format: string) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format as TextFormatType)
  }, [editor])

  return (
    <div className="flex gap-1 py-3 px-6 border-b border-gray-200 bg-gray-50/50 mb-0 sticky top-0 z-10 backdrop-blur-sm">
      <button
        onClick={() => formatText('bold')}
        className="px-3 py-2 border border-gray-200 bg-white rounded-md cursor-pointer text-sm flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 shadow-sm hover:shadow-md"
        title="Bold (Ctrl+B)"
      >
        <Bold size={16} className="text-gray-600" />
      </button>
      <button
        onClick={() => formatText('italic')}
        className="px-3 py-2 border border-gray-200 bg-white rounded-md cursor-pointer text-sm flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 shadow-sm hover:shadow-md"
        title="Italic (Ctrl+I)"
      >
        <Italic size={16} className="text-gray-600" />
      </button>
      <button
        onClick={() => formatText('underline')}
        className="px-3 py-2 border border-gray-200 bg-white rounded-md cursor-pointer text-sm flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 shadow-sm hover:shadow-md"
        title="Underline (Ctrl+U)"
      >
        <Underline size={16} className="text-gray-600" />
      </button>
      <button
        onClick={() => formatText('code')}
        className="px-3 py-2 border border-gray-200 bg-white rounded-md cursor-pointer text-sm flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 shadow-sm hover:shadow-md"
        title="Code"
      >
        <Code size={16} className="text-gray-600" />
      </button>
    </div>
  )
}
