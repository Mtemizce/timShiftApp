// ✅ cli/init-permissions.js

import dotenv from 'dotenv'
dotenv.config()

import sequelize from '../backend/config/database.js'
import Permission from '../backend/models/Permission.js'

const permissions = [
  // Auth
  { name: 'auth.login', label: 'Giriş Yap' },
  { name: 'auth.logout', label: 'Çıkış Yap' },

  // Personnel
  { name: 'personnel.view', label: 'Personel Listeleme' },
  { name: 'personnel.create', label: 'Personel Oluşturma' },
  { name: 'personnel.update', label: 'Personel Güncelleme' },
  { name: 'personnel.delete', label: 'Personel Silme' },

  // Definition
  { name: 'definition.view', label: 'Tanım Listeleme' },
  { name: 'definition.create', label: 'Tanım Ekleme' },
  { name: 'definition.update', label: 'Tanım Güncelleme' },
  { name: 'definition.delete', label: 'Tanım Silme' },

  // System config
  { name: 'config.view', label: 'Sistem Ayarlarını Görüntüleme' },
  { name: 'config.update', label: 'Sistem Ayarlarını Güncelleme' }
]

const run = async () => {
  try {
    await sequelize.authenticate()
    await Permission.bulkCreate(permissions, { ignoreDuplicates: true })
    console.log('✅ Yetkiler başarıyla yüklendi.')
    process.exit(0)
  } catch (err) {
    console.error('❌ Yetki ekleme hatası:', err.message)
    process.exit(1)
  }
}

run()
