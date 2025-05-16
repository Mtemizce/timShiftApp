import express from 'express'
import AuthController from '../controllers/AuthController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'
import { logActivityMiddleware } from '../middleware/logMiddleware.js'

const router = express.Router()

router.post(
  '/login',
  logActivityMiddleware('auth', 'login'),
  AuthController.login
)
router.get('/me', authenticateToken, AuthController.me)
router.post(
  '/logout',
  authenticateToken,
  logActivityMiddleware('auth', 'logout'),
  AuthController.logout
)


export default router
