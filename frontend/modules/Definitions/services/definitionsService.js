// ✅ frontend/modules/Definitions/services/definitionsService.js

const getToken = () => localStorage.getItem("token")  // 🔄 düzeltildi

export const fetchDefinitionsByType = async (type) => {
  const res = await fetch(`/api/definitions/${type}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Tanım verisi alınamadı")
  return data.data
}

export const createDefinition = async (payload) => {
  const res = await fetch(`/api/definitions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(payload)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Kayıt başarısız")
  return data
}

export const deleteDefinition = async (id) => {
  const res = await fetch(`/api/definitions/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Silme işlemi başarısız")
  return data
}
export const updateDefinition = async (id, payload) => {
  const res = await fetch(`/api/definitions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Güncelleme başarısız");
  return data;
};
export const toggleDefinitionActive = async (id, active) => {
  const res = await fetch(`/api/definitions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ active })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Durum güncellenemedi");
  return data;
};
export const getDefinitions = async () => {
  const res = await fetch("/api/definitions", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Tanımlar alınamadı")
  return data
}


