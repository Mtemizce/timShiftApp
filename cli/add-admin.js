import readline from 'readline'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()

import sequelize from '../backend/config/database.js'
import Admin from '../backend/models/Admin.js'

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

    const hashedPassword = await bcrypt.hash(password, 10)

    await Admin.create({
      username,
      name,
      phone,
      email,
      password: hashedPassword
    })

    console.log('✅ Admin başarıyla oluşturuldu.')
    rl.close()
    process.exit(0)
  } catch (error) {
    console.error('❌ Hata:', error)
    rl.close()
    process.exit(1)
  }
}

createAdmin()
