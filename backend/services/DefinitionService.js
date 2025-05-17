import Definition from '../models/Definition.js'

const DefinitionService = {
  getByType: async (type) => {
    return await Definition.findAll({ where: { type, active: true }, order: [['order', 'ASC']] })
  },

  create: async (data) => {
    return await Definition.create(data)
  },

  update: async (id, data) => {
    const def = await Definition.findByPk(id)
    if (!def) return null
    await def.update(data)
    return def
  },

  delete: async (id) => {
    const def = await Definition.findByPk(id)
    if (!def) return null
    await def.destroy()
    return def
  }
}

export default DefinitionService
