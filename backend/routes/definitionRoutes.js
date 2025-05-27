import DefinitionController from "../controllers/DefinitionController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { logActivityMiddleware } from "../middleware/logMiddleware.js";

export default [
   {
    method: "get",
    path: "/",
    handler: DefinitionController.getAll,
    permission: "definition.view",
    middlewares: [authenticateToken, logActivityMiddleware("definition", "get")],
  },

  {
    method: "get",
    path: "/:type",
    handler: DefinitionController.getByType,
    permission: "definition.view",
    middlewares: [authenticateToken, logActivityMiddleware("definition", "get")],
  },

  {
    method: "post",
    path: "/",
    handler: DefinitionController.store,
    permission: "definition.create",
    middlewares: [
      authenticateToken,
      logActivityMiddleware("definition", "create"),
    ],
  },
  {
    method: "put",
    path: "/:id",
    handler: DefinitionController.update,
    permission: "definition.update",
    middlewares: [
      authenticateToken,
      logActivityMiddleware("definition", "update"),
    ],
  },
  {
    method: "delete",
    path: "/:id",
    handler: DefinitionController.destroy,
    permission: "definition.delete",
    middlewares: [
      authenticateToken,
      logActivityMiddleware("definition", "delete"),
    ],
  },
];
