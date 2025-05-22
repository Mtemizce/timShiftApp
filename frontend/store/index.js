// ✅ frontend/store/index.js
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
  const admin = JSON.parse(localStorage.getItem("admin"))

  try {
    if (token) {
      const [, payload] = token.split('.')
      const decoded = JSON.parse(atob(payload))
      const isExpired = decoded.exp * 1000 < Date.now()

      if (!isExpired) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        })
      }
    }
  } catch (err) {
    console.warn("Logout isteği başarısız:", err.message)
  }

  // temizle
  localStorage.removeItem("token")
  localStorage.removeItem("admin")
  localStorage.removeItem("expires_at")
  localStorage.removeItem("personnelTable_columns")

  set({ admin: null, token: null })
}

}))
