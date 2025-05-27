import PersonnelController from "../controllers/PersonnelController.js"
import { authenticateToken } from "../middleware/authMiddleware.js"
import { logActivityMiddleware } from "../middleware/logMiddleware.js"
import { validate } from "../middleware/validate.js"
import { personnelRules } from "../validators/personnelValidator.js"
import { normalizeExcelDates } from '../middleware/excelDateMiddleware.js'


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
]
