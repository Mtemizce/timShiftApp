export const fetchSystemConfigs = async () => {
  const res = await fetch('/api/system-config')
  if (!res.ok) throw new Error('Failed')
  return res.json()
}

export const updateSystemConfigs = async (items) => {
  const res = await fetch('/api/system-config', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  })
  if (!res.ok) throw new Error('Failed')
  return res.json()
}