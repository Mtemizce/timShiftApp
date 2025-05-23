// ✅ frontend/store/personnel.js (revize: getFilterElement fonksiyonu dahil edildi)
import { create } from "zustand"
import React from "react"

const usePersonnelStore = create((set) => ({
  searchText: "",
  visibleColumns: ["name", "phone", "department", "role"],
  fullscreen: false,
  orderBy: "",
  orderDirection: "asc",
  filters: {},

  data: [],
  columns: [
    { key: "name", label: "Ad Soyad" },
    { key: "phone", label: "Telefon" },
    { key: "department", label: "Departman" },
    { key: "role", label: "Görev" },
  ],

  setData: (newData) => set({ data: newData }),
  setSearchText: (text) => set({ searchText: text }),
  toggleColumn: (key) =>
    set((state) => ({
      visibleColumns: state.visibleColumns.includes(key)
        ? state.visibleColumns.filter((col) => col !== key)
        : [...state.visibleColumns, key],
    })),
  setVisibleColumns: (columns) => set({ visibleColumns: columns }),
  setFullscreen: (value) => set({ fullscreen: value }),
  setOrderBy: (key) =>
    set((state) => ({
      orderBy: key,
      orderDirection:
        state.orderBy === key && state.orderDirection === "asc"
          ? "desc"
          : "asc",
    })),
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  getFilterElement: (key, type, value, onChange, options = []) => {
    const className = `filter_${type}_${key}`

    if (type === "text") {
      return (
        <input
          key={key}
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className={`px-2 py-1 border rounded text-sm ${className}`}
          placeholder="Ara..."
        />
      )
    }

    if (type === "select") {
      return (
        <select
          key={key}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className={`px-2 py-1 border rounded text-sm ${className}`}
        >
          <option value="">Seçiniz</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )
    }

    return null
  },
}))

export default usePersonnelStore
