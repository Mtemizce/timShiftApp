import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Admin from '../models/Admin.js'
import BlacklistToken from '../models/BlacklistToken.js'


const AuthService = {
  login: async (username, password) => {
    const admin = await Admin.findOne({ where: { username } })
    if (!admin) throw new Error('Kullanıcı bulunamadı')

    const passwordMatch = await bcrypt.compare(password, admin.password)
    if (!passwordMatch) throw new Error('Şifre yanlış')

    const token = jwt.sign(
      { id: admin.id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return token
  },
  logout: async (token) => {
  await BlacklistToken.create({
    token,
    reason: 'manual logout',
    expiredAt: new Date(Date.now() + 3600 * 1000) // 1 saat sonra geçersiz sayılabilir
  })
}
}

export default AuthService
