// ✅ cli/add-admin.js

import readline from 'readline'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()

import sequelize from '../backend/config/database.js'
import Admin from '../backend/models/Admin.js'
import Role from '../backend/models/Role.js'
import AdminRole from '../backend/models/AdminRole.js'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const ask = (question) => new Promise((resolve) => rl.question(question, resolve))

const createAdmin = async () => {
  try {
    await sequelize.authenticate()

    const username = await ask('Kullanıcı adı: ')
    const name = await ask('Ad Soyad: ')
    const phone = await ask('Telefon: ')
    const email = await ask('E-posta: ')
    const password = await ask('Şifre: ')

    const allRoles = await Role.findAll()
    if (allRoles.length === 0) {
      console.log('❌ Tanımlı rol yok. Önce seed:roles komutunu çalıştırmalısın.')
      rl.close()
      process.exit(1)
    }

    console.log('\nMevcut Roller:')
    allRoles.forEach((role, i) => console.log(`${i + 1}) ${role.name}`))

    const roleInput = await ask('Kaç numaralı rol/rolleri atamak istersin? (virgülle ayır): ')
    const roleIndices = roleInput.split(',').map(i => parseInt(i.trim()) - 1)
    const selectedRoles = roleIndices.map(i => allRoles[i]).filter(Boolean)

    if (selectedRoles.length === 0) {
      console.log('❌ Geçerli rol seçilmedi.')
      rl.close()
      process.exit(1)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newAdmin = await Admin.create({
      username,
      name,
      phone,
      email,
      password: hashedPassword
    })

    await Promise.all(selectedRoles.map(role =>
      AdminRole.create({ admin_id: newAdmin.id, role_id: role.id })
    ))

    console.log(`✅ Admin başarıyla oluşturuldu ve roller atandı: ${selectedRoles.map(r => r.name).join(', ')}`)
    rl.close()
    process.exit(0)
  } catch (error) {
    console.error('❌ Hata:', error)
    rl.close()
    process.exit(1)
  }
}

createAdmin()
