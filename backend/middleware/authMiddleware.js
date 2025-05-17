// ✅ backend/middleware/authMiddleware.js

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

import BlacklistToken from '../models/BlacklistToken.js'

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      console.warn('❌ Authorization header eksik')
      return res.status(401).json({ message: 'Kimlik doğrulama başarısız' })
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      console.warn('❌ Bearer token bulunamadı')
      return res.status(401).json({ message: 'Token eksik' })
    }

    const isBlacklisted = await BlacklistToken.findOne({ where: { token } })
    if (isBlacklisted) {
      console.warn('❌ Blacklist token ile erişim denemesi')
      return res.status(403).json({ message: 'Token engellenmiş' })
    }

    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } catch (err) {
    console.error('❌ Token doğrulama hatası:', err.message)
    return res.status(403).json({ message: 'Geçersiz veya süresi dolmuş token' })
  }
}
