// ✅ frontend/modules/Definitions/Index.jsx

import { useEffect, useState } from "react"
import { fetchDefinitionsByType, deleteDefinition } from "./services/definitionsService"
import CreateForm from "./pages/CreateForm"
import { notify } from "@/utils/notify"

export default function DefinitionIndex() {
  const [type, setType] = useState("personnel_type")
  const [list, setList] = useState([])

  const loadData = async () => {
    try {
      const data = await fetchDefinitionsByType(type)
      setList(data)
    } catch (err) {
      notify("Hata", err.message, { toastr: false })
    }
  }

  useEffect(() => {
    loadData()
  }, [type])

  const handleDelete = async (id) => {
    try {
      await deleteDefinition(id)
      notify("Silindi", "Tanım silindi", { toastr: true })
      loadData()
    } catch (err) {
      notify("Hata", err.message, { toastr: false })
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Tanımlar</h2>

      <div className="flex gap-2 mb-4">
        <label>Tür:</label>
        <select value={type} onChange={(e) => setType(e.target.value)} className="input w-60">
          <option value="personnel_type">Görev</option>
          <option value="department">Birim</option>
          <option value="education">Eğitim</option>
          <option value="size_pants">Pantolon</option>
          <option value="size_tshirt">Tişört</option>
          <option value="size_shoes">Ayakkabı</option>
        </select>
      </div>

      <CreateForm onSuccess={loadData} />

      <ul className="space-y-1">
        {list.map((item) => (
          <li key={item.id} className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded flex justify-between">
            <span>{item.key}</span>
            <button onClick={() => handleDelete(item.id)} className="text-sm text-red-600 hover:underline">
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}