// ✅ backend/models/SystemConfig.js

import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const SystemConfig = sequelize.define('SystemConfig', {
  admin_session_minutes: {
    type: DataTypes.INTEGER,
    defaultValue: 30
  },
  clear_blacklist_on_logout: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  enable_backup: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  backup_interval_hours: {
    type: DataTypes.INTEGER,
    defaultValue: 24
  },
  last_backup_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  system_status: {
    type: DataTypes.ENUM('active', 'maintenance'),
    defaultValue: 'active'
  }
}, {
  tableName: 'system_configs',
  timestamps: true
})

export default SystemConfig
