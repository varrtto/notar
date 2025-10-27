import { Menu, Moon, Plus, Sun, XIcon } from "lucide-react";
import { useThemeStore } from "../stores/themeStore";
import { useNotesSync } from "../stores/useNotesSync";

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function Header({ onToggleSidebar, isSidebarOpen }: HeaderProps) {
  const { addNote, isLoading } = useNotesSync();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header
      className="flex justify-between items-center px-4 md:px-8 py-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:text-white shadow-sm dark:bg-gray-800"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? (
            <XIcon size={20} className="text-gray-600" />
          ) : (
            <Menu size={20} className="text-gray-600" />
          )}
        </button>
        <h1 className="m-0 text-2xl font-bold text-gray-900 tracking-tight dark:text-white">
          Notar
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun size={20} className="text-gray-600 dark:text-white" />
          ) : (
            <Moon size={20} className="text-gray-600" />
          )}
        </button>
        <button
          onClick={addNote}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white border-none rounded-lg cursor-pointer text-sm font-medium hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          <Plus size={16} /> <span className="hidden md:inline">Add Note</span>
        </button>
      </div>
    </header>
  );
}
