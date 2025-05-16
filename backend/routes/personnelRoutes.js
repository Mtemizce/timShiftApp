// ✅ backend/routes/personnelRoutes.js

import express from 'express'
import PersonnelController from '../controllers/PersonnelController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'
import { logActivityMiddleware } from '../middleware/logMiddleware.js'

const router = express.Router()

// Listeleme (log yok)
router.get('/', authenticateToken, PersonnelController.index)
router.get('/:id', authenticateToken, PersonnelController.show)

// Oluşturma
router.post(
  '/',
  authenticateToken,
  logActivityMiddleware('personnel', 'create'),
  PersonnelController.store
)

// Güncelleme
router.put(
  '/:id',
  authenticateToken,
  logActivityMiddleware('personnel', 'update'),
  PersonnelController.update
)

// Silme
router.delete(
  '/:id',
  authenticateToken,
  logActivityMiddleware('personnel', 'delete'),
  PersonnelController.destroy
)

export default router
