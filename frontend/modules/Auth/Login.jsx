import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppStore } from "../../store"
import Swal from 'sweetalert2'

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const setAdmin = useAppStore((state) => state.setAdmin)
  const setToken = useAppStore((state) => state.setToken)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()
      const rawToken = data.token?.token || data.token
      if (!res.ok || !rawToken) throw new Error(data.message || "Giriş başarısız")

      setToken(rawToken)
      localStorage.setItem("token", rawToken)

      const meRes = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${rawToken}` },
      })

      const meData = await meRes.json()
      if (!meRes.ok || !meData.user) throw new Error("Kullanıcı bilgisi alınamadı")

      setAdmin(meData.user)
      localStorage.setItem("admin", JSON.stringify(meData.user))

      Swal.fire({
        title: `Hoş geldin, ${meData.user.name}`,
        text: `Oturum süreniz 30 dakika.`,
        icon: 'success',
        timer: 3000,
        showConfirmButton: false
      })

      navigate("/dashboard")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">Admin Girişi</h2>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <input type="text" placeholder="Kullanıcı Adı" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 mb-4 w-full rounded" />
        <input type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 mb-4 w-full rounded" />
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  )
}