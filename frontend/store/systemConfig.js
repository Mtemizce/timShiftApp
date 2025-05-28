import { create } from "zustand";
import { fetchSystemConfigs, updateSystemConfigs } from "@/modules/Settings/services/systemConfigService";
import { notify } from "@/utils/notify";

export const useSystemConfigStore = create((set) => ({
  configs: [],
  loading: false,

  loadConfigs: async () => {
    try {
      set({ loading: true });
      const res = await fetchSystemConfigs();
      set({ configs: res, loading: false });
    } catch (err) {
      notify("Hata", "Ayarlar yüklenemedi :"+ err, {
        toastr: true,
        duration: 4000,
        icon: "error",
      });
      set({ loading: false });
    }
  },

  updateConfigs: async (items) => {
    try {
      await updateSystemConfigs(items);
      notify("Başarılı", "Ayarlar güncellendi", {
        toastr: true,
        duration: 4000,
        icon: "success",
      });
    } catch (err) {
        notify("Hata", "Güncelleme başarısız :"+ err, {
        toastr: true,
        duration: 4000,
        icon: "error",
      });
    }
  },
}));
