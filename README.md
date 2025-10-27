# Notar 📝

A modern, feature-rich note-taking application built with React, TypeScript, and Lexical editor. Notar provides a clean and intuitive interface for creating, managing, and organizing your notes with persistent storage using IndexedDB.

## ✨ Features

- 🎨 **Rich Text Editor**: Powered by Lexical, Facebook's extensible text editor framework
- 🌙 **Dark Mode**: Toggle between light and dark themes with persistent preference
- 📱 **Responsive Design**: Mobile-first design with hamburger menu for smaller screens
- 💾 **Persistent Storage**: Automatic saving to IndexedDB for offline-first functionality
- 🔄 **Real-time Sync**: State management with Zustand for instant updates
- 🗑️ **Note Management**: Create, edit, delete, and organize notes effortlessly
- 🎯 **Modern UI**: Built with Tailwind CSS for a beautiful, consistent design

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/notar.git
cd notar
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Lexical** - Rich text editor framework
- **Zustand** - State management
- **Tailwind CSS v4** - Utility-first styling
- **IndexedDB** - Client-side database
- **Lucide React** - Icon library

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx       # App header with theme toggle
│   ├── Sidebar.tsx      # Notes list sidebar
│   ├── NoteListItem.tsx # Individual note item
│   ├── SelectedNote.tsx # Note editor view
│   ├── NoteEditor.tsx   # Lexical editor component
│   ├── EmptyState.tsx   # Empty state placeholder
│   └── Error.tsx        # Error display component
├── stores/              # Zustand stores
│   ├── notesStore.ts    # Notes state management
│   ├── indexedDBStore.ts# IndexedDB operations
│   ├── useNotesSync.ts  # Sync hook for notes
│   └── themeStore.ts    # Theme management
└── plugins/             # Lexical plugins
    └── ToolbarPlugin.tsx# Editor toolbar
```

## 🎮 Usage

### Creating a Note
Click the "Add Note" button in the header to create a new note.

### Editing Notes
1. Click on any note in the sidebar to open it
2. Edit the title in the header input
3. Use the rich text editor to format your content
4. Changes are automatically saved to IndexedDB

### Deleting Notes
Hover over a note in the sidebar and click the trash icon to delete it.

### Toggling Dark Mode
Click the sun/moon icon in the header to switch between light and dark themes.

## 📦 Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.