// ✅ backend/middleware/permissionMiddleware.js

import Role from '../models/Role.js'
import Permission from '../models/Permission.js'
import Admin from '../models/Admin.js'

export const permissionMiddleware = (permissionName) => {
  return async (req, res, next) => {
    try {
      const userId = req.user?.id
      if (!userId) return res.status(401).json({ message: 'Kimlik doğrulama başarısız' })

      const admin = await Admin.findByPk(userId, {
        include: {
          model: Role,
          include: [Permission]
        }
      })

      const permissions = admin?.Roles?.flatMap(role => role.Permissions?.map(p => p.name)) || []

      if (!permissions.includes(permissionName)) {
        return res.status(403).json({ message: 'Bu işlemi yapma yetkiniz yok' })
      }

      next()
    } catch (err) {
      console.error('Permission kontrol hatası:', err.message)
      res.status(500).json({ message: 'Yetki kontrolünde hata oluştu' })
    }
  }
}
