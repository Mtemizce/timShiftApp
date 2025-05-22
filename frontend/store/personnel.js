import { create } from "zustand";

const usePersonnelStore = create((set) => ({
  searchText: "",
  visibleColumns: ["name", "phone", "department", "role"],
  fullscreen: false,
  orderBy: "",
  orderDirection: "asc",

  data: [], // merkezi veri
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
}));

export default usePersonnelStore;
