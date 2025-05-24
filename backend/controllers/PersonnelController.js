// ✅ backend/controllers/PersonnelController.js

import PersonnelService from '../services/PersonnelService.js'
import PersonnelResource from '../resources/PersonnelResource.js'

const PersonnelController = {
   index: async (req, res) => {
    try {
      const personnelList = await PersonnelService.getAll()
      res.json({
        message: 'Personel listesi',
        data: personnelList.map(p => PersonnelResource(p)) // ✔️ frontend buna erişiyor
      })
    } catch (err) {
      console.error('❌ Personel listeleme hatası:', err)
      res.status(500).json({ message: 'Bir hata oluştu', error: err.message })
    }
  },

  show: async (req, res) => {
    try {
      const personnel = await PersonnelService.getById(req.params.id)
      if (!personnel) return res.status(404).json({ message: 'Personel bulunamadı' })

      res.json({
        message: 'Personel detay',
        data: PersonnelResource(personnel)
      })
    } catch (err) {
      console.error('❌ Personel detay hatası:', err)
      res.status(500).json({ message: 'Bir hata oluştu', error: err.message })
    }
  },

  store: async (req, res) => {
    try {
      const newPersonnel = await PersonnelService.create(req.body)
      res.locals.logData = { name: newPersonnel.name }
      res.status(201).json({
        message: 'Personel oluşturuldu',
        data: PersonnelResource(newPersonnel)
      })
    } catch (err) {
      console.error('❌ Personel oluşturma hatası:', err)
      res.status(500).json({ message: 'Bir hata oluştu', error: err.message })
    }
  },

  update: async (req, res) => {
    try {
      const updatedPersonnel = await PersonnelService.update(req.params.id, req.body)
      if (!updatedPersonnel) return res.status(404).json({ message: 'Personel bulunamadı' })
      res.locals.logData = { name: updatedPersonnel.name }
      res.json({ message: 'Personel güncellendi', data: PersonnelResource(updatedPersonnel) })
    } catch (err) {
      console.error('❌ Personel güncelleme hatası:', err)
      res.status(500).json({ message: 'Bir hata oluştu', error: err.message })
    }
  },

  destroy: async (req, res) => {
    try {
      const deletedPersonnel = await PersonnelService.delete(req.params.id)
      if (!deletedPersonnel) return res.status(404).json({ message: 'Personel bulunamadı' })
      res.locals.logData = { name: deletedPersonnel.name }
      res.json({ message: 'Personel silindi' })
    } catch (err) {
      console.error('❌ Personel silme hatası:', err)
      res.status(500).json({ message: 'Bir hata oluştu', error: err.message })
    }
  },
  importBulk: async (req, res) => {
  try {
    const rows = req.body.data
    if (!Array.isArray(rows)) return res.status(400).json({ message: 'Geçersiz veri' })

    const inserted = await PersonnelService.importMany(rows)
    res.status(201).json({ message: 'Toplu personel eklendi', inserted })
  } catch (err) {
    console.error('❌ Toplu ekleme hatası:', err)
    res.status(500).json({ message: 'Bir hata oluştu', error: err.message })
  }
}

}

export default PersonnelController
