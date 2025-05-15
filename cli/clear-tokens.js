import dotenv from 'dotenv'
dotenv.config()

import sequelize from '../backend/config/database.js'
import BlacklistedToken from '../backend/models/BlacklistedToken.js'

const clear = async () => {
  try {
    await sequelize.authenticate()
    const result = await BlacklistedToken.destroy({ where: {} })
    console.log(`✅ ${result} token kaydı silindi.`)
    process.exit(0)
  } catch (err) {
    console.error('❌ Token temizleme hatası:', err)
    process.exit(1)
  }
}

clear()
