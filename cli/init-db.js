import dotenv from 'dotenv'
dotenv.config()

import sequelize from '../backend/config/database.js'

// Modeller

import BlacklistToken from '../backend/models/BlacklistToken.js'
import ActivityLog from '../backend/models/ActivityLog.js'
import Personnel from '../backend/models/Personnel.js'
import SystemConfig from '../backend/models/SystemConfig.js'
import Definition from '../backend/models/Definition.js'


import Permission from '../backend/models/Permission.js'
import AdminRole from '../backend/models/AdminRole.js'
import RolePermission from '../backend/models/RolePermission.js'

import '../backend/models/index.js' // ilişki tanımlarını yükle

const migrate = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ DB bağlantısı başarılı.')

    await sequelize.sync({ alter: true })
    console.log('✅ Tablolar başarıyla oluşturuldu veya güncellendi.')

    process.exit(0)
  } catch (error) {
    console.error('❌ Migration hatası:', error)
    process.exit(1)
  }
}

migrate()
