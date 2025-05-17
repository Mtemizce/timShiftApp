import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Admin from '../models/Admin.js'
import Role from '../models/Role.js'
import Permission from '../models/Permission.js'
import BlacklistToken from '../models/BlacklistToken.js'

const AuthService = {
  login: async (username, password) => {
    const admin = await Admin.findOne({
      where: { username },
      include: {
        model: Role,
        include: [Permission]
      }
    })

    if (!admin) throw new Error('Kullanıcı bulunamadı')

    const passwordMatch = await bcrypt.compare(password, admin.password)
    if (!passwordMatch) throw new Error('Şifre yanlış')

    // Tüm roller ve yetkileri topla
    const roles = admin.Roles?.map(role => role.name) || []
    const permissions = admin.Roles?.flatMap(role =>
      role.Permissions?.map(p => p.name)
    ) || []

    const token = jwt.sign(
      {
        id: admin.id,
        roles,
        permissions
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return token
  },

  logout: async (token) => {
    await BlacklistToken.create({
      token,
      reason: 'manual logout',
      expiredAt: new Date(Date.now() + 3600 * 1000)
    })
  }
}

export default AuthService
