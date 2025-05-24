// ✅ frontend/modules/Definitions/pages/CreateForm.jsx

import { useState } from "react"
import { createDefinition } from "../services/definitionsService"
import { notify } from "@/utils/notify"

export default function CreateForm({ onSuccess }) {
  const [type, setType] = useState("")
  const [key, setKey] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createDefinition({ type, key })
      notify("Eklendi", "Yeni tanım başarıyla eklendi", { toastr: true })
      setKey("")
      if (onSuccess) onSuccess()
    } catch (err) {
      notify("Hata", err.message, { toastr: false })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <select value={type} onChange={(e) => setType(e.target.value)} className="input w-40">
        <option value="">Tür Seç</option>
        <option value="personnel_type">Görev</option>
        <option value="department">Birim</option>
        <option value="education">Eğitim</option>
        <option value="size_pants">Pantolon</option>
        <option value="size_tshirt">Tişört</option>
        <option value="size_shoes">Ayakkabı</option>
      </select>
      <input value={key} onChange={(e) => setKey(e.target.value)} placeholder="Tanım Adı" className="input" />
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        Ekle
      </button>
    </form>
  )
}