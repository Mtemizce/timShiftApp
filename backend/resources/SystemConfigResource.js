const SystemConfigResource = (config) => ({
  admin_session_minutes: config.admin_session_minutes,
  clear_blacklist_on_logout: config.clear_blacklist_on_logout,
  enable_backup: config.enable_backup,
  backup_interval_hours: config.backup_interval_hours,
  last_backup_at: config.last_backup_at,
  system_status: config.system_status
})

export default SystemConfigResource
