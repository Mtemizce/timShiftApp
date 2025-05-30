import PersonnelController from "../controllers/PersonnelController.js"
import { authenticateToken } from "../middleware/authMiddleware.js"
import { logActivityMiddleware } from "../middleware/logMiddleware.js"
import { validate } from "../middleware/validate.js"
import { personnelRules } from "../validators/personnelValidator.js"
import { normalizeExcelDates } from '../middleware/excelDateMiddleware.js'
import { uploadPersonnelPhoto } from "../middleware/uploadPhotoMiddleware.js";
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// Dosya gönderim handler'ı
const getPhoto = (req, res) => {
  const { tc_no, filename } = req.params

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  const photoPath = path.join(__dirname, "../../frontend/assets/personnelPhotos", tc_no, filename)

  if (!fs.existsSync(photoPath)) {
    return res.status(404).json({ message: "Fotoğraf bulunamadı" })
  }

  res.sendFile(photoPath)
}

export default [
  {
    method: "get",
    path: "/",
    handler: PersonnelController.index,
    permission: "personnel.view",
    middlewares: [authenticateToken],
  },
  {
    method: "get",
    path: "/:id",
    handler: PersonnelController.show,
    permission: "personnel.view",
    middlewares: [authenticateToken],
  },
  {
    method: "post",
    path: "/",
    handler: PersonnelController.store,
    permission: "personnel.create",
    middlewares: [
      authenticateToken,
      uploadPersonnelPhoto,
      ...personnelRules.create,
      validate,
      logActivityMiddleware("personnel", "create")
    ],
  },
  {
    method: "put",
    path: "/:id",
    handler: PersonnelController.update,
    permission: "personnel.update",
    middlewares: [
      authenticateToken,
      uploadPersonnelPhoto,
      ...personnelRules.update,
      validate,
      logActivityMiddleware("personnel", "update")
    ],
  },
  {
    method: "delete",
    path: "/:id",
    handler: PersonnelController.destroy,
    permission: "personnel.delete",
    middlewares: [
      authenticateToken,
      logActivityMiddleware("personnel", "delete")
    ],
  },
  {
    method: "post",
    path: "/import",
    handler: PersonnelController.importBulk,
    permission: "personnel.create",
    middlewares: [
      authenticateToken,
      normalizeExcelDates,
      ...personnelRules.import,
      validate,
      logActivityMiddleware("personnel", "import")
    ],
  },
  {
  method: "get",
  path: "/photo/:tc_no/:filename",
  handler: getPhoto,
  permission: "", // 📌 Yetki kontrolü aktif
  middlewares: []
},
]
