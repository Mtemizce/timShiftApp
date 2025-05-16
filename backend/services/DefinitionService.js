// ✅ backend/services/DefinitionService.js

import Definition from '../models/Definition.js'

const DefinitionService = {
  getByType: async (type) => {
    return await Definition.findAll({
      where: { type, active: true },
      order: [['order', 'ASC']]
    })
  }
}

export default DefinitionService
