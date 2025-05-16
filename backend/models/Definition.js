// ✅ backend/models/Definition.js

import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Definition = sequelize.define('Definition', {
  type: {
    type: DataTypes.STRING, // örn: 'personnel_type', 'department', 'leave_type'
    allowNull: false
  },
  key: {
    type: DataTypes.STRING, // örn: 'Şoför', 'Mıntıka', 'Muhasebe'
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'definitions',
  timestamps: true
})

export default Definition
