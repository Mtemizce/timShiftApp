// ✅ frontend/layouts/partials/Header.jsx
import { useAppStore } from '../../store'
import { LogOut, Sun, Moon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

export default function Header({ onToggleSidebar }) {
  const admin = useAppStore((state) => state.admin)
  const logout = useAppStore((state) => state.logout)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark')
  const [dropdownOpen, setDropdownOpen] = useState(false)
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

  return (
    <header className="bg-white dark:bg-gray-800 shadow px-4 py-3 flex items-center justify-between">
      <button onClick={onToggleSidebar} className="md:hidden">☰</button>
      <h1 className="text-xl font-semibold">Admin Paneli</h1>

      <div className="flex items-center gap-3">
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="px-3 py-2 border rounded hover:bg-gray-200 dark:hover:bg-gray-700">
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