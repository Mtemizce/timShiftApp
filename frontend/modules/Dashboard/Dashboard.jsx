// ✅ frontend/modules/Dashboard/Dashboard.jsx

import { useAppStore } from '../../store'

export default function Dashboard() {
  const admin = useAppStore((state) => state.admin)

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Dashboard</h2>
      <p className="text-gray-600">Hoş geldin <strong>{admin?.name}</strong> 👋</p>
      <p className="text-sm text-gray-500 mt-2">Roller: {admin?.roles?.join(', ')}</p>
    </div>
  )
}
