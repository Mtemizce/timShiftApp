// ✅ backend/controllers/DefinitionController.js

import DefinitionService from '../services/DefinitionService.js'

const DefinitionController = {
  getByType: async (req, res) => {
    try {
      const { type } = req.params
      const list = await DefinitionService.getByType(type)
      res.json({
        message: `${type} tanımları listelendi`,
        data: list
      })
    } catch (err) {
      console.error('❌ Definition getirme hatası:', err)
      res.status(500).json({ message: 'Bir hata oluştu', error: err.message })
    }
  }
}

export default DefinitionController
