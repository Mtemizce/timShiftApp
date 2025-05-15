import jwt from 'jsonwebtoken'
import BlacklistedToken from '../models/BlacklistedToken.js'

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.sendStatus(401)

  const isBlacklisted = await BlacklistedToken.findOne({ where: { token } })
  if (isBlacklisted) return res.status(403).json({ message: 'Token engellenmiş' })

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}
