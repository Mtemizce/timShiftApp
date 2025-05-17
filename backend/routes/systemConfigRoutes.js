import SystemConfigController from "../controllers/SystemConfigController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { logActivityMiddleware } from '../middleware/logMiddleware.js'


export default [
  {
    method: "get",
    path: "/",
    handler: SystemConfigController.get,
    permission: "config.view",
    middlewares: [authenticateToken],
  },
  {
    method: "put",
    path: "/",
    handler: SystemConfigController.update,
    permission: "config.update",
    middlewares: [authenticateToken, logActivityMiddleware("system-config", "update")],
  },
];
