import dotenv from 'dotenv'
dotenv.config()

import sequelize from '../backend/config/database.js'

// Modelleri buraya import et
import Admin from '../backend/models/Admin.js'

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
