import { create } from "zustand";
import { personnelColumns } from "./personnelColumns";

const usePersonnelStore = create((set) => ({
  searchText: "",
  visibleColumns: ["name", "phone", "department", "role"],
  fullscreen: false,
  orderBy: "",
  orderDirection: "asc",
  filters: {},
  selectedPersonnel: null,


  data: [],
  columns: personnelColumns,

  setData: (newData) => set({ data: newData }),

  getPersonnels: async () => {
    try {
      const res = await fetch("/api/personnel", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const json = await res.json();
      set({ data: json.data });
    } catch (err) {
      console.error("Personel verisi alınamadı:", err);
    }
  },
  getPersonnelById: async (id) => {
    try {
      const res = await fetch(`/api/personnel/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const json = await res.json();
      set({ selectedPersonnel: json.data });
    } catch (err) {
      console.error("Personel verisi alınamadı:", err);
    }
  },

  setSearchText: (text) => set({ searchText: text }),
  toggleColumn: (key) =>
    set((state) => ({
      visibleColumns: state.visibleColumns.includes(key) ? state.visibleColumns.filter((col) => col !== key) : [...state.visibleColumns, key],
    })),
  setVisibleColumns: (columns) => set({ visibleColumns: columns }),
  setFullscreen: (value) => set({ fullscreen: value }),
  setOrderBy: (key) =>
    set((state) => ({
      orderBy: key,
      orderDirection: state.orderBy === key && state.orderDirection === "asc" ? "desc" : "asc",
    })),
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
}));

export default usePersonnelStore;
