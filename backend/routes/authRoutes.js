import AuthController from '../controllers/AuthController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'
import { logActivityMiddleware } from '../middleware/logMiddleware.js'

export default [
  {
    method: 'post',
    path: '/login',
    handler: AuthController.login,
    permission: null,
    middlewares: [logActivityMiddleware('auth', 'login')]
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
