// ✅ backend/routes/definitionRoutes.js

import express from 'express'
import DefinitionController from '../controllers/DefinitionController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

// Örnek: GET /api/definitions/personnel_type
router.get('/:type', authenticateToken, DefinitionController.getByType)

export default router
