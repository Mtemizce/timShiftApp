// ✅ backend/routes/index.js

import authRoutes from './authRoutes.js'
import personnelRoutes from './personnelRoutes.js'
import definitionRoutes from './definitionRoutes.js'
import systemConfigRoutes from './systemConfigRoutes.js'
import { permissionMiddleware } from '../middleware/permissionMiddleware.js'

// Tüm route gruplarını tek diziye topla
const routeGroups = [
  { basePath: '/api/auth', routes: authRoutes },
  { basePath: '/api/personnel', routes: personnelRoutes },
  { basePath: '/api/definitions', routes: definitionRoutes },
  { basePath: '/api/system-config', routes: systemConfigRoutes }
  // 🔜 İleride leave, report gibi modüller buraya eklenebilir
]

export default function registerRoutes(app) {
  routeGroups.forEach(group => {
    const { basePath, routes } = group

    routes.forEach(({ method, path, handler, permission, middlewares = [] }) => {
      const fullPath = `${basePath}${path}`

      const routeStack = [
        ...(permission ? [permissionMiddleware(permission)] : []),
        ...middlewares,
        handler
      ]

      app[method](fullPath, ...routeStack)
    })
  })
}
