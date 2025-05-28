// ✅ frontend/layouts/partials/Sidebar.jsx (revize: onClose kaldırıldı - kullanılmıyordu)
import { NavLink } from 'react-router-dom'
import { FileText, Users, Cog, LayoutDashboard, Variable } from 'lucide-react'

export default function Sidebar({ isOpen }) {
  return (
    <aside
      className={`fixed z-30 inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-0`}
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 text-xl font-bold">timShiftApp</div>
      <nav className="p-4 space-y-2">
        <NavLink to="/dashboard" className={({ isActive }) => navClass(isActive)}><LayoutDashboard className="w-5 h-5"  /> Dashboard</NavLink>
        <NavLink to="/personnel" className={({ isActive }) => navClass(isActive)}><Users className="w-5 h-5"  /> Personel</NavLink>
        <NavLink to="/reports/personnel" className={({ isActive }) => navClass(isActive)} ><FileText className="w-5 h-5" /> Personel Raporu</NavLink>
        <NavLink to="/definitions" className={({ isActive }) => navClass(isActive)}><Variable className="w-5 h-5"  /> Tanımlar</NavLink>
        <NavLink to="/settings" className={({ isActive }) => navClass(isActive)}><Cog className="w-5 h-5"  /> Ayarlar</NavLink>
      </nav>
    </aside>
  )
}

function navClass(isActive) {
  return `flex flex-row justify-start item-center px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 ${isActive ? 'bg-gray-300 dark:bg-gray-700 font-semibold' : ''}`
}
