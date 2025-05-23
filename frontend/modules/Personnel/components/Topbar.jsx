// ✅ frontend/modules/Personnel/components/Topbar.jsx (revize: kolon bazlı filtre desteği)
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'

export default function Topbar() {
  const navigate = useNavigate()
 

  return (
    <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
      <h3 className="text-lg font-semibold">Personeller</h3>

      <div className="flex flex-wrap gap-2 items-center">
        
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
