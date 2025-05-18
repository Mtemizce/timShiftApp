// frontend/store/personnel.js
import { create } from 'zustand'

const usePersonnelStore = create((set) => ({
  searchText: '',
  setSearchText: (text) => set({ searchText: text }),

  fullscreen: false,
  setFullscreen: (value) => set({ fullscreen: value }),

  visibleColumns: ['name', 'phone', 'department', 'role'],
  toggleColumn: (column) =>
    set((state) => ({
      visibleColumns: state.visibleColumns.includes(column)
        ? state.visibleColumns.filter((col) => col !== column)
        : [...state.visibleColumns, column],
    })),
}))

export default usePersonnelStore
