import { create } from 'zustand'

export const useAppStore = create((set) => ({
  admin: null,
  token: null,
  darkMode: false,

  setAdmin: (admin) => set({ admin }),
  setToken: (token) => set({ token }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('admin')
    set({ admin: null, token: null })
  }
}))
