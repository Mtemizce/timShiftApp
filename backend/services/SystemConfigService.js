// services/SystemConfigService.js
import SystemConfig from "../models/SystemConfig.js";

const SystemConfigService = {
  get: async () => {
    const config = await SystemConfig.findOne();
    return config;
  },

  update: async (data) => {
    const config = await SystemConfig.findOne();
    if (!config) throw new Error("Sistem ayarları bulunamadı");
    await config.update(data);
    return config;
  },
};
export default SystemConfigService;
