import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppStore } from "../../../store"
import { notify } from "../../../utils/notify"
import { login, getMe } from "../services/authService" // ← service import

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const setAdmin = useAppStore((state) => state.setAdmin)
  const setToken = useAppStore((state) => state.setToken)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const rawToken = await login(username, password)
      setToken(rawToken)
      localStorage.setItem("token", rawToken)

      const user = await getMe(rawToken)
      setAdmin(user)
      localStorage.setItem("admin", JSON.stringify(user))

      notify("Oturum Açıldı!", `Hoş geldin ${user.name}`, {
        toastr: true,
        duration: 3000,
        icon: "success",
      })
      navigate("/dashboard")
    } catch (err) {
      notify("Hata!", err.message || "Giriş başarısız", {
        toastr: true,
        duration: 3000,
        icon: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          Admin Girişi
        </h2>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  )
}
