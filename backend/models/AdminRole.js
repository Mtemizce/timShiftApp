// ✅ backend/models/AdminRole.js

import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'
import Admin from './Admin.js'
import Role from './Role.js'

const AdminRole = sequelize.define('AdminRole', {
  admin_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Admin,
      key: 'id'
    }
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'id'
    }
  }
}, {
  tableName: 'admin_roles',
  timestamps: false
})

Admin.belongsToMany(Role, { through: AdminRole, foreignKey: 'admin_id' })
Role.belongsToMany(Admin, { through: AdminRole, foreignKey: 'role_id' })

export default AdminRole
