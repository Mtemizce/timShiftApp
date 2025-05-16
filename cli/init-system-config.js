// ✅ cli/init-system-config.js

import dotenv from 'dotenv'
dotenv.config()

import sequelize from '../backend/config/database.js'
import SystemConfig from '../backend/models/SystemConfig.js'

const run = async () => {
  try {
    await sequelize.authenticate()
    const [config, created] = await SystemConfig.findOrCreate({
      where: {},
      defaults: {
        admin_session_minutes: 30,
        clear_blacklist_on_logout: true,
        enable_backup: false,
        backup_interval_hours: 24,
        last_backup_at: null,
        system_status: 'active'
      }
    })

    if (created) {
      console.log('✅ SystemConfig default ayarları oluşturuldu.')
    } else {
      console.log('⚠️ SystemConfig zaten mevcut, işlem yapılmadı.')
    }

    process.exit(0)
  } catch (err) {
    console.error('❌ SystemConfig seed hatası:', err.message)
    process.exit(1)
  }
}

run()
