import { Outlet, useNavigate } from "react-router-dom"
import { useAppStore } from "../store"
import { useEffect, useState } from "react"
import Header from "./partials/Header"
import Sidebar from "./partials/Sidebar"

export default function AdminLayout() {
  const admin = useAppStore((state) => state.admin)
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    // Eğer admin yoksa ama token varsa localStorage'den tekrar al
    if (!admin) {
      const token = localStorage.getItem("token")
      const storedAdmin = localStorage.getItem("admin")
      if (!token || !storedAdmin) {
        navigate("/login")
      }
    }
  }, [admin, navigate])

  // Bu sayede layout en azından boş gelmez
  if (!admin) {
  return <div className="p-4 text-center text-gray-500">Yükleniyor...</div>
}

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Sidebar isOpen={sidebarOpen} />
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
