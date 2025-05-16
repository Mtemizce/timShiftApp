// ✅ backend/controllers/SystemConfigController.js

import SystemConfigService from '../services/SystemConfigService.js'

const SystemConfigController = {
  get: async (req, res) => {
    try {
      const config = await SystemConfigService.get()
      res.json({ message: 'Sistem ayarları getirildi', data: config })
    } catch (err) {
      console.error('❌ Sistem ayarları getirme hatası:', err)
      res.status(500).json({ message: 'Hata oluştu', error: err.message })
    }
  },

  update: async (req, res) => {
    try {
      const updated = await SystemConfigService.update(req.body)
      res.json({ message: 'Ayarlar güncellendi', data: updated })
    } catch (err) {
      console.error('❌ Sistem ayarları güncelleme hatası:', err)
      res.status(500).json({ message: 'Hata oluştu', error: err.message })
    }
  }
}

export default SystemConfigController
