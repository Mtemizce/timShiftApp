// ✅ frontend/store/index.js (kalıcı oturum verisi için localStorage senkronize edildi)
import { create } from "zustand";

export const useAppStore = create((set) => ({
  admin: JSON.parse(localStorage.getItem("admin")) || null,
  token: localStorage.getItem("token") || null,
  darkMode: false,

  setAdmin: (admin) => {
    localStorage.setItem("admin", JSON.stringify(admin));
    set({ admin });
  },

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  logout: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.warn("Backend logout isteği başarısız:", err.message);
      }
    }

    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    set({ admin: null, token: null });
  },
}));
