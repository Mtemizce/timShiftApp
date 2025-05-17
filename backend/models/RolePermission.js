// ✅ backend/models/RolePermission.js

import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'
import Role from './Role.js'
import Permission from './Permission.js'

const RolePermission = sequelize.define('RolePermission', {
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'id'
    }
  },
  permission_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Permission,
      key: 'id'
    }
  }
}, {
  tableName: 'role_permissions',
  timestamps: false
})

Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'role_id' })
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permission_id' })

export default RolePermission
