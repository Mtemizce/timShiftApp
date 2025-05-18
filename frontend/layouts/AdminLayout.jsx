// ✅ frontend/layouts/AdminLayout.jsx (tam entegre responsive layout)
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAppStore } from '../store'
import { useEffect, useRef, useState } from 'react'
import { LogOut, Sun, Moon } from 'lucide-react'

export default function AdminLayout() {
  const admin = useAppStore((state) => state.admin)
  const logout = useAppStore((state) => state.logout)
  const navigate = useNavigate()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark')

  const dropdownRef = useRef(null)

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
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!admin) navigate('/login')
  }, [admin, navigate])

  if (!admin) return null

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className={`fixed z-30 inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow transform transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-0`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 text-xl font-bold">timShiftApp</div>
        <nav className="p-4 space-y-2">
          <NavLink to="/dashboard" className={({ isActive }) => navClass(isActive)}>🏠 Dashboard</NavLink>
          <NavLink to="/personnel" className={({ isActive }) => navClass(isActive)}>👷 Personel</NavLink>
          <NavLink to="/definitions" className={({ isActive }) => navClass(isActive)}>📚 Tanımlar</NavLink>
          <NavLink to="/config" className={({ isActive }) => navClass(isActive)}>⚙️ Ayarlar</NavLink>
        </nav>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white dark:bg-gray-800 shadow p-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">☰</button>
          <h1 className="text-xl font-semibold">Admin Paneli</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)}>{darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="px-3 py-2 border rounded">{admin?.name || 'Kullanıcı'}</button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded shadow z-50">
                  <button onClick={() => { logout(); navigate('/login') }} className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600">
                    <LogOut className="w-4 h-4" /> Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function navClass(isActive) {
  return `block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${isActive ? 'bg-gray-300 dark:bg-gray-700 font-semibold' : ''}`
}
