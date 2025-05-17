import DefinitionService from '../services/DefinitionService.js'
import DefinitionResource from '../resources/DefinitionResource.js'

const DefinitionController = {
  getByType: async (req, res) => {
    try {
      const { type } = req.params
      const list = await DefinitionService.getByType(type)
      res.json({
        message: `${type} tanımları listelendi`,
        data: list.map(DefinitionResource)
      })
    } catch (err) {
      res.status(500).json({ message: 'Bir hata oluştu', error: err.message })
    }
  },

  store: async (req, res) => {
    try {
      const def = await DefinitionService.create(req.body)
      res.locals.logData = { name: def.key }
      res.status(201).json({
        message: 'Tanım oluşturuldu',
        data: DefinitionResource(def)
      })
    } catch (err) {
      res.status(500).json({ message: 'Bir hata oluştu', error: err.message })
    }
  },

  update: async (req, res) => {
    try {
      const def = await DefinitionService.update(req.params.id, req.body)
      if (!def) return res.status(404).json({ message: 'Tanım bulunamadı' })
      res.locals.logData = { name: def.key }
      res.json({ message: 'Tanım güncellendi', data: DefinitionResource(def) })
    } catch (err) {
      res.status(500).json({ message: 'Bir hata oluştu', error: err.message })
    }
  },

  destroy: async (req, res) => {
    try {
      const def = await DefinitionService.delete(req.params.id)
      if (!def) return res.status(404).json({ message: 'Tanım bulunamadı' })
      res.locals.logData = { name: def.key }
      res.json({ message: 'Tanım silindi' })
    } catch (err) {
      res.status(500).json({ message: 'Bir hata oluştu', error: err.message })
    }
  }
}

export default DefinitionController
