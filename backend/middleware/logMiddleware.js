import ActivityLog from '../models/ActivityLog.js'
import { LogMessages } from '../helpers/logMessages.js'

export const logActivityMiddleware = (moduleName, actionType = null, descriptionData = {}) => {
  return async (req, res, next) => {
    try {
      const method = req.method
      if (!['POST', 'PUT', 'DELETE'].includes(method)) return next()

      const user = req.user
      const action = actionType || method.toLowerCase()
      const messageKey = `${action.toUpperCase()}_${moduleName.toUpperCase()}`
      const descriptionFn = LogMessages[messageKey]

      // pseudo-queue: log'u bekletmeden fire-and-forget
      setImmediate(async () => {
        try {
          await ActivityLog.create({
            admin_id: user?.id || null,
            action,
            module: moduleName,
            target_id: req.params?.id || null,
            description: descriptionFn ? descriptionFn(user?.username, descriptionData) : `${method} ${req.originalUrl}`
          })
        } catch (e) {
          console.error('⛔ Log queue hatası:', e.message)
        }
      })
    } catch (err) {
      console.error('⚠️ Log middleware hatası:', err.message)
    }

    next()
  }
}
