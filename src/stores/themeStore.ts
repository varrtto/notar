import { create } from 'zustand'

interface ThemeState {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()((set) => ({
  theme: (() => {
    const saved = localStorage.getItem('notar-theme')
    if (saved === 'dark' || saved === 'light') {
      document.documentElement.classList.toggle('dark', saved === 'dark')
      return saved
    }
    return 'light'
  })(),
  
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light'
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('notar-theme', newTheme)
    return { theme: newTheme }
  }),
}))