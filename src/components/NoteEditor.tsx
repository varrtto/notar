import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { $getRoot, type EditorState } from 'lexical'
import { useEffect, useRef } from 'react'
import { ToolbarPlugin } from '../plugins/ToolbarPlugin'



interface NoteEditorProps {
  onChange: (content: string) => void
  content: string
}

// Plugin to restore editor state from saved content and handle focus
function RestoreEditorStatePlugin({ content }: { content: string }) {
  const [editor] = useLexicalComposerContext()
  const lastContentRef = useRef<string>('')
  const isInternalUpdateRef = useRef<boolean>(false)
  const hasFocusedRef = useRef<boolean>(false)

  useEffect(() => {
    // Focus on first mount (for new notes)
    if (!hasFocusedRef.current) {
      setTimeout(() => {
        editor.focus()
        hasFocusedRef.current = true
      }, 100)
    }

    // Only restore if content has actually changed (not from our own updates)
    if (content && content !== lastContentRef.current && !isInternalUpdateRef.current) {
      try {
        const parsedContent = JSON.parse(content)
        editor.setEditorState(editor.parseEditorState(parsedContent))
        lastContentRef.current = content
      } catch (error) {
        console.error('Error restoring editor state:', error)
      }
    } else if (!content && lastContentRef.current) {
      // Clear editor when content is empty (new note)
      editor.update(() => {
        const root = $getRoot()
        root.clear()
      })
      lastContentRef.current = ''
    }
    // Reset the internal update flag after processing
    isInternalUpdateRef.current = false
  }, [content, editor])

  // Listen for editor changes to mark internal updates
  useEffect(() => {
    const unregister = editor.registerUpdateListener(() => {
      // This is an internal update from typing, mark it
      isInternalUpdateRef.current = true
    })
    return unregister
  }, [editor])

  return null
}

export function NoteEditor({ onChange, content }: NoteEditorProps) {
  const initialConfig = {
    namespace: 'NotarEditor',
    theme: {
      text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
        strikethrough: 'line-through',
        code: 'font-mono bg-gray-100 px-1.5 py-0.5 rounded text-sm text-gray-800',
      },
      paragraph: 'mb-4 last:mb-0',
      heading: {
        h1: 'text-3xl font-bold mb-6 text-gray-900',
        h2: 'text-2xl font-semibold mb-4 text-gray-800',
        h3: 'text-xl font-medium mb-3 text-gray-700',
      },
      list: {
        nested: {
          listitem: 'list-none',
        },
        ol: 'list-decimal list-inside mb-4 space-y-1',
        ul: 'list-disc list-inside mb-4 space-y-1',
        listitem: 'text-gray-700',
      },
      quote: 'border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4',
      code: 'bg-gray-100 p-4 rounded-lg font-mono text-sm text-gray-800 mb-4 block',
      codeHighlight: {
        atrule: 'text-purple-600',
        attr: 'text-blue-600',
        boolean: 'text-red-600',
        builtin: 'text-purple-600',
        cdata: 'text-gray-600',
        char: 'text-green-600',
        class: 'text-blue-600',
        'class-name': 'text-blue-600',
        comment: 'text-gray-500 italic',
        constant: 'text-red-600',
        deleted: 'text-red-600',
        doctype: 'text-gray-600',
        entity: 'text-orange-600',
        function: 'text-purple-600',
        important: 'text-red-600',
        inserted: 'text-green-600',
        keyword: 'text-purple-600',
        namespace: 'text-blue-600',
        number: 'text-red-600',
        operator: 'text-gray-600',
        prolog: 'text-gray-600',
        property: 'text-blue-600',
        punctuation: 'text-gray-600',
        regex: 'text-green-600',
        selector: 'text-purple-600',
        string: 'text-green-600',
        symbol: 'text-red-600',
        tag: 'text-purple-600',
        url: 'text-blue-600',
        variable: 'text-red-600',
      },
    },
    onError: (error: Error) => {
      console.error(error)
    },
  }

  const handleChange = (editorState: EditorState) => {
    const serializedState = editorState.toJSON()
    onChange(JSON.stringify(serializedState))
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin />
      <RestoreEditorStatePlugin content={content} />
      <div className="relative">
        <RichTextPlugin
          ErrorBoundary={LexicalErrorBoundary}
          contentEditable={
            <ContentEditable 
              className="min-h-[500px] p-6 text-gray-800 text-base leading-relaxed outline-none resize-none focus:outline-none prose prose-lg max-w-none" 
              tabIndex={2}
              style={{
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                lineHeight: '1.7',
                fontSize: '16px',
              }}
            />
          }
        />
        <OnChangePlugin onChange={handleChange} />
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  )
}
