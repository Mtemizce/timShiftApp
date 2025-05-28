// services/SystemConfigService.js

const db = require("../models");
const SystemConfigResource = require("../resources/SystemConfigResource");

const getSystemConfig = async () => {
  const config = await db.SystemConfig.findOne();
  return new SystemConfigResource(config);
};

const updateSystemConfig = async (data) => {
  const config = await db.SystemConfig.findOne();
  await config.update(data);
  return new SystemConfigResource(config);
};

const getSessionConfig = async () => {
  const config = await db.SystemConfig.findOne();
  return {
    sessionTime: config.use_db_session_time
      ? config.admin_session_minutes
      : parseInt(process.env.SESSION_TIMEOUT_MINUTES || "30"),
  };
};

module.exports = {
  getSystemConfig,
  updateSystemConfig,
  getSessionConfig,
};
