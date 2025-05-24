import { create } from "zustand"

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
    { key: "tc_no", label: "TC Kimlik No" },
    { key: "birth_date", label: "Doğum Tarihi" },
    { key: "marital_status", label: "Medeni Durum" },
    { key: "criminal_record", label: "Adli Sicil" },
    { key: "education_level", label: "Eğitim" },
    { key: "children_count", label: "Çocuk Sayısı" },
    { key: "driving_license", label: "Ehliyet" },
    { key: "iban", label: "IBAN" },
    { key: "start_date", label: "İşe Giriş" },
    { key: "end_date", label: "Çıkış Tarihi" },
    { key: "certificates", label: "Sertifikalar" },
    { key: "address", label: "Adres" },
    { key: "email", label: "Email" },
    { key: "size_pants", label: "Pantolon" },
    { key: "size_tshirt", label: "Tişört" },
    { key: "size_coat", label: "Mont" },
    { key: "size_shoes", label: "Ayakkabı" },
    { key: "image_file", label: "Fotoğraf" }
  ],

  setData: (newData) => set({ data: newData }),

  getPersonnels: async () => {
    try {
      const res = await fetch("/api/personnel", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      const json = await res.json()
      set({ data: json.data })
    } catch (err) {
      console.error("Personel verisi alınamadı:", err)
    }
  },

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
        state.orderBy === key && state.orderDirection === "asc" ? "desc" : "asc",
    })),
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
}))

export default usePersonnelStore
