// ✅ backend/services/PersonnelService.js

import Personnel from "../models/Personnel.js";

const PersonnelService = {
  getAll: async () => {
    return await Personnel.findAll({ order: [["id", "DESC"]] });
  },

  getById: async (id) => {
    return await Personnel.findByPk(id);
  },

  create: async (data) => {
    return await Personnel.create(data);
  },

  update: async (id, data) => {
    const personnel = await Personnel.findByPk(id);
    if (!personnel) return null;
    await personnel.update(data);
    return personnel;
  },

  delete: async (id) => {
    const personnel = await Personnel.findByPk(id);
    if (!personnel) return null;
    await personnel.destroy();
    return personnel;
  },
  importMany: async (rows) => {
    const created = await Personnel.bulkCreate(rows);
    return created.length;
  },
};

export default PersonnelService;
