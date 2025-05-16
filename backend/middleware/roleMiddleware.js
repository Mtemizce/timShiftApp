// ✅ backend/middleware/roleMiddleware.js

export const authorizeRole = (roles = []) => {
  return (req, res, next) => {
    const userRole = req.user?.role
    if (!userRole) return res.status(403).json({ message: 'Yetki bulunamadı' })

    // Tek bir rol verildiyse, diziye çevir
    if (typeof roles === 'string') roles = [roles]

    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'Yetki reddedildi' })
    }
    next()
  }
}
