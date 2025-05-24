// ✅ frontend/layouts/AdminLayout.jsx (yeni yapı: Header ve Sidebar ayrıldı)
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppStore } from '../store'
import { useEffect, useState } from 'react'
import Header from './partials/Header'
import Sidebar from './partials/Sidebar'
import 'sweetalert2/dist/sweetalert2.min.css'


export default function AdminLayout() {
  const admin = useAppStore((state) => state.admin)
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!admin) navigate('/login')
  }, [admin, navigate])

  if (!admin) return null

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}