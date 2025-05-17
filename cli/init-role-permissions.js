// ✅ cli/init-role-permissions.js

import dotenv from 'dotenv'
dotenv.config()

import sequelize from '../backend/config/database.js'
import Role from '../backend/models/Role.js'
import Permission from '../backend/models/Permission.js'
import RolePermission from '../backend/models/RolePermission.js'

const rolePermissionsMap = {
  'super-admin': [
    'auth.login', 'auth.logout',
    'personnel.view', 'personnel.create', 'personnel.update', 'personnel.delete',
    'definition.view', 'definition.create', 'definition.update', 'definition.delete',
    'config.view', 'config.update'
  ],
  'admin': [
    'auth.login', 'auth.logout',
    'personnel.view', 'personnel.create', 'personnel.update',
    'definition.view'
  ]
}

const run = async () => {
  try {
    await sequelize.authenticate()

    for (const [roleName, permissionList] of Object.entries(rolePermissionsMap)) {
      const role = await Role.findOne({ where: { name: roleName } })
      if (!role) continue

      for (const permName of permissionList) {
        const permission = await Permission.findOne({ where: { name: permName } })
        if (permission) {
          await RolePermission.findOrCreate({
            where: {
              role_id: role.id,
              permission_id: permission.id
            }
          })
        }
      }
    }

    console.log('✅ Rol-yetki eşlemeleri başarıyla yüklendi.')
    process.exit(0)
  } catch (err) {
    console.error('❌ Rol-yetki eşleme hatası:', err.message)
    process.exit(1)
  }
}

run()
