// ✅ backend/routes/index.js

import authRoutes from './authRoutes.js'
import personnelRoutes from './personnelRoutes.js'
import definitionRoutes from './definitionRoutes.js'
// import leaveRoutes from './leaveRoutes.js'
// import reportRoutes from './reportRoutes.js'

export default function registerRoutes(app) {
  app.use('/api/auth', authRoutes)
  app.use('/api/personnel', personnelRoutes)
  app.use('/api/definitions', definitionRoutes)

  // İleride şu modüller eklenebilir:
  // app.use('/api/leave', leaveRoutes)
  // app.use('/api/report', reportRoutes)
}
