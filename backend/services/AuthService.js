import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Admin, Role, Permission, Session, BlacklistToken } from '../models/index.js'
import SystemConfigService from './SystemConfigService.js'
const config = await SystemConfig.findOne()

const getSessionConfig = async () => {
  const source = await SystemConfigService.get('SESSION_TIMEOUT_SOURCE') || 'env'
  let minutes = 30

  if (source === 'db') {
    const dbVal = await SystemConfigService.get('SESSION_TIMEOUT_MINUTES')
    minutes = parseInt(dbVal || '30', 10)
  } else {
    minutes = parseInt(process.env.SESSION_TIMEOUT_MINUTES || '30', 10)
  }

  return {
    minutes,
    expiresIn: `${minutes}m`,
    expiresAt: new Date(Date.now() + minutes * 60 * 1000),
  }
}

const AuthService = {
  login: async (username, password) => {
    const admin = await Admin.findOne({
      where: { username },
      include: {
        model: Role,
        include: [Permission],
      },
    })

    if (!admin) throw new Error('Kullanıcı bulunamadı')

    const passwordMatch = await bcrypt.compare(password, admin.password)
    if (!passwordMatch) throw new Error('Şifre yanlış')

    const existingSession = await Session.findOne({
      where: {
        admin_id: admin.id,
        revoked: false,
        expires_at: { [Symbol.for('gt')]: new Date() },
      },
      order: [['createdAt', 'DESC']],
    })

    const { minutes, expiresIn, expiresAt } = await getSessionConfig()

    if (existingSession) {
      const remaining = Math.floor((new Date(existingSession.expires_at) - Date.now()) / 60000)
      return {
        message: `Oturumunuz zaten açık. Kalan süreniz: ${remaining} dk`,
        token: existingSession.token,
        reused: true,
      }
    }

    const roles = admin.Roles?.map(role => role.name) || []
    const permissions = admin.Roles?.flatMap(role => role.Permissions?.map(p => p.name)) || []

    const token = jwt.sign(
      { id: admin.id, roles, permissions },
      process.env.JWT_SECRET,
      { expiresIn }
    )

    await Session.create({
      admin_id: admin.id,
      token,
      expires_at: expiresAt,
      revoked: false,
    })

    return { token, reused: false }
  },

  logout: async (token) => {
    const { minutes } = await getSessionConfig()
    await BlacklistToken.create({
      token,
      reason: 'manual logout',
      expiredAt: new Date(Date.now() + minutes * 60 * 1000),
    })

    await Session.update({ revoked: true }, { where: { token } })
  },
}

export default AuthService
