// ✅ backend/routes/authRoutes.js (CommonJS uyumlu)
const AuthController = require('../controllers/AuthController')
const { authenticateToken } = require('../middleware/authMiddleware')
const { logActivityMiddleware } = require('../middleware/logMiddleware')

module.exports = [
  {
    method: 'post',
    path: '/login',
    handler: AuthController.login,
    permission: null,
    middlewares: []
  },
  {
    method: 'get',
    path: '/me',
    handler: AuthController.me,
    permission: null,
    middlewares: [authenticateToken]
  },
  {
    method: 'post',
    path: '/logout',
    handler: AuthController.logout,
    permission: null,
    middlewares: [authenticateToken, logActivityMiddleware('auth', 'logout')]
  }
]
