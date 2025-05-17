import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const RolePermission = sequelize.define('RolePermission', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  role_id: DataTypes.INTEGER,
  permission_id: DataTypes.INTEGER
}, {
  tableName: 'role_permissions',
  timestamps: false
})

export default RolePermission
