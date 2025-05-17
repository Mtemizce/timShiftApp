// ✅ cli/init-roles.js

import dotenv from 'dotenv'
dotenv.config()

import sequelize from '../backend/config/database.js'
import Role from '../backend/models/Role.js'

const roles = [
  { name: 'super-admin', description: 'Tüm yetkilere sahip tam yönetici' },
  { name: 'admin', description: 'Sadece belirli işlemleri yapabilen kullanıcı' }
]

const run = async () => {
  try {
    await sequelize.authenticate()
    await Role.bulkCreate(roles, { ignoreDuplicates: true })
    console.log('✅ Roller başarıyla yüklendi.')
    process.exit(0)
  } catch (err) {
    console.error('❌ Rol ekleme hatası:', err.message)
    process.exit(1)
  }
}

run()
