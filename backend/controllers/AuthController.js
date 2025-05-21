// ✅ backend/controllers/AuthController.js
const AuthService = require('../services/AuthService')
const Admin = require('../models/Admin')
const Role = require('../models/Role')
const Permission = require('../models/Permission')
const ActivityLog = require('../models/ActivityLog')

const AuthController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body
      const token = await AuthService.login(username, password)

      const admin = await Admin.findOne({ where: { username } })

      await ActivityLog.create({
        admin_id: admin.id,
        module: 'auth',
        action: 'login',
        target_id: admin.id,
        description: `${admin.username} kullanıcısı sisteme giriş yaptı.`
      })

      res.json({ token })
    } catch (err) {
      res.status(401).json({ message: err.message })
    }
  },

  me: async (req, res) => {
    try {
      const userId = req.user?.id
      if (!userId) return res.status(401).json({ message: 'Kimlik doğrulanamadı' })

      const admin = await Admin.findByPk(userId, {
        attributes: ['id', 'username', 'name'],
        include: {
          model: Role,
          include: [Permission]
        }
      })

      if (!admin) return res.status(404).json({ message: 'Kullanıcı bulunamadı' })

      const roles = admin.Roles?.map(role => role.name) || []
      const permissions = admin.Roles?.flatMap(role => role.Permissions?.map(p => p.name)) || []

      res.json({
        user: {
          id: admin.id,
          username: admin.username,
          name: admin.name,
          roles,
          permissions
        }
      })
    } catch (err) {
      res.status(500).json({ message: 'Me bilgisi alınamadı', error: err.message })
    }
  },

  logout: async (req, res) => {
    try {
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1]
      if (!token) return res.status(400).json({ message: 'Token bulunamadı' })

      await AuthService.logout(token)
      res.json({ message: 'Çıkış yapıldı' })
    } catch (err) {
      res.status(500).json({ message: 'Logout hatası', error: err.message })
    }
  }
}

module.exports = AuthController
