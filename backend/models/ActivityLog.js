// backend/models/ActivityLog.js

import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const ActivityLog = sequelize.define('ActivityLog', {
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  action: {
    type: DataTypes.STRING, // örn: 'create', 'update', 'login', 'logout', 'delete'
    allowNull: false
  },
  module: {
    type: DataTypes.STRING, // örn: 'personnel', 'report', 'auth'
    allowNull: false
  },
  target_id: {
    type: DataTypes.INTEGER, // örn: düzenlenen personnel ID'si vs.
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'activity_logs',
  timestamps: true
})

export default ActivityLog
