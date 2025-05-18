// frontend/lib/api.js
const BASE_PATH = import.meta.env.VITE_API_BASE || '/api'

export async function api(path, method = 'GET', data = null, customHeaders = {}) {
  const token = localStorage.getItem('token')

  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }

  const options = {
    method,
    headers
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  const res = await fetch(`${BASE_PATH}${path}`, options)

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || 'Sunucu hatası')
  }

  return res.json()
}
