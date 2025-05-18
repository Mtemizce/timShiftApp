// ✅ backend/services/AuthService.js (Session kontrolü entegre)

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()

import Admin from '../models/Admin.js'
import Role from '../models/Role.js'
import Permission from '../models/Permission.js'
import Session from '../models/Session.js'
import BlacklistToken from '../models/BlacklistToken.js'

const TOKEN_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'
const TOKEN_MS = 60 * 60 * 1000 // 1 saat

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

    // ➕ Session kontrolü (aktif session var mı?)
    const existingSession = await Session.findOne({
      where: {
        admin_id: admin.id,
        revoked: false,
        expires_at: { [Symbol.for('gt')]: new Date() }
      },
      order: [['createdAt', 'DESC']]
    })

    if (existingSession) {
      const remaining = Math.floor((new Date(existingSession.expires_at) - Date.now()) / 60000)
      return {
        message: `Oturumunuz zaten açık. Kalan süreniz: ${remaining} dk`,
        token: existingSession.token,
        reused: true
      }
    }

    // Roller ve izinleri al
    const roles = admin.Roles?.map(role => role.name) || []
    const permissions = admin.Roles?.flatMap(role => role.Permissions?.map(p => p.name)) || []

    const token = jwt.sign(
      {
        id: admin.id,
        roles,
        permissions
      },
      process.env.JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES_IN }
    )

    // Yeni session kaydı
    await Session.create({
      admin_id: admin.id,
      token,
      expires_at: new Date(Date.now() + TOKEN_MS),
      revoked: false
    })

    return { token, reused: false }
  },

  logout: async (token) => {
    await BlacklistToken.create({
      token,
      reason: 'manual logout',
      expiredAt: new Date(Date.now() + TOKEN_MS)
    })

    await Session.update(
      { revoked: true },
      { where: { token } }
    )
  }
}

export default AuthService
