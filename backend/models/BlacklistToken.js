// ✅ Token blacklist modeli
// backend/models/BlacklistToken.js

import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const BlacklistToken = sequelize.define('BlacklistToken', {
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true
  },
  expiredAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'blacklisted_tokens',
  timestamps: true,
  updatedAt: false
})

export default BlacklistToken
