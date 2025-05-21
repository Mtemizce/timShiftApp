// ✅ frontend/components/Header.jsx (revize: dark mode + oturum süresi takibi)
import { useEffect, useRef, useState } from 'react'
import { LogOut, Moon, Sun, Clock3 } from 'lucide-react'
import { useAppStore } from "@/store";
import { useNavigate } from 'react-router-dom'

export default function Header({ onToggleSidebar }) {
  const admin = useAppStore((state) => state.admin)
  const logout = useAppStore((state) => state.logout)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [remaining, setRemaining] = useState(0)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Token kalan süre hesaplama
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token')
      if (!token) return setRemaining(0)
      try {
        const [, payload] = token.split('.')
        const decoded = JSON.parse(atob(payload))
        const remainingMs = decoded.exp * 1000 - Date.now()
        setRemaining(Math.max(0, remainingMs))

        if (remainingMs <= 0) {
          logout()
          navigate('/login')
        }
      } catch {
        setRemaining(0)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [logout, navigate])

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow px-4 py-3 flex items-center justify-between">
      <button onClick={onToggleSidebar} className="md:hidden">☰</button>
      <h1 className="text-xl font-semibold">Admin Paneli</h1>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-2 text-sm text-gray-700 dark:text-gray-200">
          <Clock3 className="w-4 h-4" />
          {formatTime(remaining)}
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-4 h-4" />}
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="px-3 py-2 border rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {admin?.name || 'Kullanıcı'}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 border rounded shadow z-50">
              <button
                onClick={async () => {
                  await logout()
                  navigate('/login')
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
              >
                <LogOut className="w-4 h-4" /> Çıkış Yap
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
