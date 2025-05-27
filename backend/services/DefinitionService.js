import Definition from "../models/Definition.js";

const DefinitionService = {
  getAll: async () => {
  return await Definition.findAll({
    order: [["type", "ASC"], ["order", "ASC"]],
  });
},

  getByType: async (type, onlyActive = false) => {
    const where = { type };
    if (onlyActive) where.active = true;

    return await Definition.findAll({
      where,
      order: [["order", "ASC"]],
    });
  },

  create: async (data) => {
    return await Definition.create(data);
  },

  update: async (id, data) => {
    const def = await Definition.findByPk(id);
    if (!def) return null;
    await def.update(data);
    return def;
  },

  delete: async (id) => {
    const def = await Definition.findByPk(id);
    if (!def) return null;
    await def.destroy();
    return def;
  },
};

export default DefinitionService;
