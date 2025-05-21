// ✅ frontend/store/index.js (tam haliyle, logout güncellenmiş ve dark mode destekli)
import { create } from 'zustand'

export const useAppStore = create((set) => ({
  admin: JSON.parse(localStorage.getItem('admin')) || null,
  token: localStorage.getItem('token') || null,
  darkMode: localStorage.getItem('theme') === 'dark',

  setAdmin: (admin) => {
    localStorage.setItem('admin', JSON.stringify(admin))
    set({ admin })
  },

  setToken: (token) => {
    localStorage.setItem('token', token)
    set({ token })
  },

  toggleDarkMode: () => set((state) => {
    const newMode = !state.darkMode
    localStorage.setItem('theme', newMode ? 'dark' : 'light')
    return { darkMode: newMode }
  }),

  logout: async () => {
    const token = localStorage.getItem("token")
    try {
      if (token) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        })
      }
    } catch (err) {
      console.warn("Logout isteği başarısız:", err.message)
    }
    localStorage.removeItem("token")
    localStorage.removeItem("admin")
    set({ admin: null, token: null })
  }
}))
