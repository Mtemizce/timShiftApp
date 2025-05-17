// ✅ backend/middleware/authMiddleware.js

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import BlacklistToken from "../models/BlacklistToken.js";

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  console.log("🧩 Token:", token);

  if (!token) {
    console.warn("❌ Token yok");
    return res.status(401).json({ message: "Kimlik doğrulama başarısız" });
  }

  try {
    const isBlacklisted = await BlacklistToken.findOne({ where: { token } });
    if (isBlacklisted) {
      console.warn("⛔ Kara listedeki token kullanıldı");
      return res.status(403).json({ message: "Token engellenmiş" });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token doğrulandı:", user);

    req.user = user;
    next();
  } catch (err) {
    console.error("❌ Token verify hatası:", err.message);
    return res.status(403).json({ message: "Geçersiz veya süresi dolmuş token" });
  }
};
