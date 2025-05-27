// ✅ cli/init-definitions.js

import dotenv from 'dotenv'
dotenv.config()

import sequelize from '../backend/config/database.js'
import Definition from '../backend/models/Definition.js'

const definitions = [
  { type: 'personnel_type', key: 'ŞOFÖR', order: 1 },
  { type: 'personnel_type', key: 'ARAÇ ARKASI', order: 2 },
  { type: 'personnel_type', key: 'MINTIKA', order: 3 },
  { type: 'personnel_type', key: 'SÜPÜRGE ELEMANI', order: 4 },
  { type: 'personnel_type', key: 'MERKEZ WC', order: 5 },
  { type: 'personnel_type', key: 'MÜFTÜLÜK CAMİ WC', order: 6 },

  { type: 'department', key: 'ATIK YÖNETİM BİRİMİ', order: 1 },
  { type: 'department', key: 'SIFIR ATIK BİRİMİ', order: 2 },

  { type: 'education_level', key: 'OKUMAMIŞ', order: 1 },
  { type: 'education_level', key: 'İLK OKUL', order: 2 },
  { type: 'education_level', key: 'ORTA OKUL', order: 3 },
  { type: 'education_level', key: 'LİSE', order: 4 },
  { type: 'education_level', key: 'ÖN LİSANS', order: 5 },
  { type: 'education_level', key: 'LİSANS', order: 6 },
  
  { type: 'militaryStatus', key: 'YAPTI', order: 1 },
  { type: 'militaryStatus', key: 'YAPMADI', order: 2 },
  { type: 'militaryStatus', key: 'MUAF', order: 3 },
  { type: 'militaryStatus', key: 'BEDELLİ', order: 4 },
  { type: 'militaryStatus', key: 'TECİLLİ', order: 5 },
  
  { type: 'size_pants', key: 'XS', order: 1 },
  { type: 'size_pants', key: 'S', order: 2 },
  { type: 'size_pants', key: 'M', order: 3 },
  { type: 'size_pants', key: 'L', order: 4 },
  { type: 'size_pants', key: 'XL', order: 5 },
  { type: 'size_pants', key: '2XL', order: 6 },
  { type: 'size_pants', key: '3XL', order: 7 },


  { type: 'size_tshirt', key: 'XS', order: 1 },
  { type: 'size_tshirt', key: 'S', order: 2 },
  { type: 'size_tshirt', key: 'M', order: 3 },
  { type: 'size_tshirt', key: 'L', order: 4 },
  { type: 'size_tshirt', key: 'XL', order: 5 },
  { type: 'size_tshirt', key: '2XL', order: 6 },
  { type: 'size_tshirt', key: '3XL', order: 7 },
  
  { type: 'size_coat', key: 'XS', order: 1 },
  { type: 'size_coat', key: 'S', order: 2 },
  { type: 'size_coat', key: 'M', order: 3 },
  { type: 'size_coat', key: 'L', order: 4 },
  { type: 'size_coat', key: 'XL', order: 5 },
  { type: 'size_coat', key: '2XL', order: 6 },
  { type: 'size_coat', key: '3XL', order: 7 },
  
  { type: 'size_shoes', key: '38', order: 1 },
  { type: 'size_shoes', key: '39', order: 2 },
  { type: 'size_shoes', key: '40', order: 3 },
  { type: 'size_shoes', key: '41', order: 4 },
  { type: 'size_shoes', key: '42', order: 5 },
  { type: 'size_shoes', key: '43', order: 6 },
  { type: 'size_shoes', key: '44', order: 7 },
  { type: 'size_shoes', key: '45', order: 8 },
  { type: 'size_shoes', key: '46', order: 9 },
  { type: 'size_shoes', key: '47', order: 10 },
  { type: 'size_shoes', key: '48', order: 11 },
  { type: 'size_shoes', key: '49', order: 12 },
  { type: 'size_shoes', key: '50', order: 13 }
  
  
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
