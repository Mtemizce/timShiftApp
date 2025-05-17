// ✅ backend/models/Permission.js

import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Permission = sequelize.define('Permission', {
  name: {
    type: DataTypes.STRING, // örn: 'personnel.create'
    allowNull: false,
    unique: true
  },
  label: {
    type: DataTypes.STRING, // UI'de gösterilecek ad
    allowNull: true
  }
}, {
  tableName: 'permissions',
  timestamps: true
})

export default Permission
