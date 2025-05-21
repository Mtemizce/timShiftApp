// backend/models/index.js

import Admin from './Admin.js'
import Role from './Role.js'
import Permission from './Permission.js'
import AdminRole from './AdminRole.js'
import RolePermission from './RolePermission.js'
import BlacklistToken from './BlacklistToken.js'
import Session from './Session.js'

// 🔗 İlişkiler:
Admin.belongsToMany(Role, { through: AdminRole, foreignKey: 'admin_id' })
Role.belongsToMany(Admin, { through: AdminRole, foreignKey: 'role_id' })

Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'role_id' })
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permission_id' })

export {
  Admin,
  Role,
  Permission,
  AdminRole,
  RolePermission, 
  BlacklistToken,
  Session
}
