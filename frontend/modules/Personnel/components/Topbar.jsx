// ✅ frontend/modules/Personnel/components/Topbar.jsx (revize: ikon-only, sade, responsive, dark uyumlu)
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'

export default function Topbar() {
  const navigate = useNavigate()

  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">Personeller</h3>
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/personnel/add')}
          className="p-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
          title="Yeni Personel Ekle"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
