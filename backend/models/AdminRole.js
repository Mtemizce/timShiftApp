import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const AdminRole = sequelize.define('AdminRole', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  admin_id: DataTypes.INTEGER,
  role_id: DataTypes.INTEGER
}, {
  tableName: 'admin_roles',
  timestamps: false
})

export default AdminRole
