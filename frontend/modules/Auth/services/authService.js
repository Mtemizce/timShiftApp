// ✅ frontend/modules/Auth/services/authService.js

export const login = async (username, password) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })

  const data = await res.json()
  const token = data.token?.token || data.token
  if (!res.ok || !token) throw new Error(data.message || "Giriş başarısız")
  return token
}

export const getMe = async (token) => {
  const res = await fetch("/api/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  })

  const data = await res.json()
  if (!res.ok || !data.user) throw new Error("Kullanıcı bilgisi alınamadı")
  return data.user
}
