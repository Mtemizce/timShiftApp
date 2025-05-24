import { useState } from "react"
import { createDefinition } from "../services/definitionsService"
import { notify } from "@/utils/notify"

export default function CreateForm({ onSuccess, type }) {
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
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow flex flex-col gap-4 h-fit"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Yeni Tanım Ekle ({type.replace("_", " ")})
        </label>
        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Tanım adı girin..."
          className="input w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium self-start"
      >
        Ekle
      </button>
    </form>
  )
}
