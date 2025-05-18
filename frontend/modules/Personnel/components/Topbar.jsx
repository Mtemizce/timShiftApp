// ✅ frontend/modules/Personnel/components/Topbar.jsx

import { useNavigate } from 'react-router-dom'

export default function Topbar() {
  const navigate = useNavigate()

  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">Personeller</h3>
      <button
        onClick={() => navigate('/personnel/add')}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Yeni Personel
      </button>
    </div>
  )
}
