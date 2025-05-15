import express from 'express'
import AuthController from '../controllers/AuthController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', AuthController.login)
router.get('/me', authenticateToken, AuthController.me)
router.post('/logout', authenticateToken, AuthController.logout)


export default router
