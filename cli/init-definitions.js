// ✅ cli/init-definitions.js

import dotenv from 'dotenv'
dotenv.config()

import sequelize from '../backend/config/database.js'
import Definition from '../backend/models/Definition.js'

const definitions = [
  { type: 'personnel_type', key: 'Şoför', order: 1 },
  { type: 'personnel_type', key: 'Araç Arkası', order: 2 },
  { type: 'personnel_type', key: 'Mıntıka', order: 3 },
  { type: 'personnel_type', key: 'WC Hizmeti', order: 4 },

  { type: 'department', key: 'Temizlik', order: 1 },
  { type: 'department', key: 'İdari İşler', order: 2 },
  { type: 'department', key: 'Araç İşleri', order: 3 }
]

const run = async () => {
  try {
    await sequelize.authenticate()
    await Definition.bulkCreate(definitions)
    console.log('✅ Definition verileri başarıyla eklendi.')
    process.exit(0)
  } catch (err) {
    console.error('❌ Definition seed hatası:', err.message)
    process.exit(1)
  }
}

run()
