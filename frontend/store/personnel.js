// ✅ frontend/store/personnel.js (tam revize edilmiş hali)
import { create } from 'zustand'

const usePersonnelStore = create((set) => ({
  searchText: '',
  visibleColumns: ['name', 'phone', 'department', 'role'],
  fullscreen: false,

  setSearchText: (text) => set({ searchText: text }),

  toggleColumn: (key) => set((state) => ({
    visibleColumns: state.visibleColumns.includes(key)
      ? state.visibleColumns.filter((col) => col !== key)
      : [...state.visibleColumns, key]
  })),

  setVisibleColumns: (columns) => set({ visibleColumns: columns }),

  setFullscreen: (value) => set({ fullscreen: value })
}))

export default usePersonnelStore
