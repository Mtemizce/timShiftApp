// ✅ frontend/modules/Definitions/services/definitionsService.js

export const fetchDefinitionsByType = async (type) => {
  const res = await fetch(`/api/definition/${type}`)
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Tanım verisi alınamadı")
  return data.data
}

export const createDefinition = async (payload) => {
  const res = await fetch(`/api/definition`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Kayıt başarısız")
  return data
}

export const deleteDefinition = async (id) => {
  const res = await fetch(`/api/definition/${id}`, { method: "DELETE" })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Silme işlemi başarısız")
  return data
}




