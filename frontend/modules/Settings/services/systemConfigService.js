export const getSystemConfig = async () => {
  const res = await fetch("/api/system-config", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  const json = await res.json()
  return json.data
}

export const updateSystemConfig = async (payload) => {
  const res = await fetch("/api/system-config", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(payload),
  })

  const json = await res.json()
  if (!res.ok) throw new Error(json.message || "Sunucu hatası")
  return json.data
}
