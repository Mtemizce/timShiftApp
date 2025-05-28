import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin, Role, Permission, Session, BlacklistToken } from "./../models/index.js";

const SESSION_MINUTES = parseInt(process.env.SESSION_TIMEOUT_MINUTES || '60', 10)
const TOKEN_MS = SESSION_MINUTES * 60 * 1000
const TOKEN_EXPIRES_IN = `${SESSION_MINUTES}m`

const AuthService = {
  login: async (username, password) => {
    const admin = await Admin.findOne({
      where: { username },
      include: {
        model: Role,
        include: [Permission],
      },
    });

    if (!admin) throw new Error("Kullanıcı bulunamadı");

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) throw new Error("Şifre yanlış");

    const existingSession = await Session.findOne({
      where: {
        admin_id: admin.id,
        revoked: false,
        expires_at: { [Symbol.for("gt")]: new Date() },
      },
      order: [["createdAt", "DESC"]],
    });


    if (existingSession) {
      const remaining = Math.floor((new Date(existingSession.expires_at) - Date.now()) / 60000);
      return {
        message: `Zaten oturum açılmış. Kalan süre: ${remaining} dk`,
        token: existingSession.token,
        reused: true,
      };
    }

    const roles = admin.Roles?.map((role) => role.name) || [];
    const permissions = admin.Roles?.flatMap((role) => role.Permissions?.map((p) => p.name)) || [];

    const token = jwt.sign({ id: admin.id, roles, permissions }, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });

    await Session.create({
      admin_id: admin.id,
      token,
      expires_at: new Date(Date.now() + TOKEN_MS),
      revoked: false,
    });

    return { token, reused: false };
  },

  logout: async (token) => {
    await BlacklistToken.create({
      token,
      reason: "manual logout",
      expiredAt: new Date(Date.now() + + TOKEN_MS),
    });

    await Session.update({ revoked: true }, { where: { token } });
  },
};

export default AuthService;
