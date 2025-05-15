// ✅ Token blacklist modeli
// backend/models/BlacklistedToken.js

import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const BlacklistedToken = sequelize.define('BlacklistedToken', {
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

export default BlacklistedToken
