import { useState } from "react";
import "./App.css";
import { EmptyState } from "./components/EmptyState";
import { Error } from "./components/Error";
import { Header } from "./components/Header";
import { SelectedNote } from "./components/SelectedNote";
import { Sidebar } from "./components/Sidebar";
import { useNotesSync } from "./stores/useNotesSync";

function App() {
  const { notes, selectedNoteId, error } = useNotesSync();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const selectedNote = notes.find((note) => note.id === selectedNoteId) || null;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <div className="flex-1 bg-white dark:bg-gray-900 overflow-y-auto">
          {selectedNote ? <SelectedNote note={selectedNote} /> : <EmptyState />}
        </div>
      </div>
    </div>
  );
}

export default App;
