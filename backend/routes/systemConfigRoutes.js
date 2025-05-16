// ✅ backend/routes/systemConfigRoutes.js

import express from 'express'
import SystemConfigController from '../controllers/SystemConfigController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', authenticateToken, SystemConfigController.get)
router.put('/', authenticateToken, SystemConfigController.update)

export default router
