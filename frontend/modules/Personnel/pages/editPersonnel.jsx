// frontend/modules/Personnel/pages/editPersonnel.jsx
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import usePersonnelStore from '@/store/personnel'

export default function EditPersonnel() {
  const { id } = useParams()
  const navigate = useNavigate()
  const formRef = useRef()
  const { getPersonnelById, selectedPersonnel } = usePersonnelStore()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getPersonnelById(id)
  }, [id, getPersonnelById])

  useEffect(() => {
    if (selectedPersonnel && formRef.current) {
      Object.entries(selectedPersonnel).forEach(([key, value]) => {
        const input = formRef.current.elements.namedItem(key)
        if (input) input.value = value
      })
    }
  }, [selectedPersonnel])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(formRef.current).entries())
    setLoading(true)
    try {
      const res = await fetch(`/api/personnel/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Güncelleme başarısız')
      navigate('/personnel')
    } catch (err) {
      console.error('Güncelleme hatası:', err)
      alert('Personel güncellenemedi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-lg font-bold mb-4">Personel Güncelle</h1>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Ad Soyad" className="w-full p-2 border rounded" />
        <input name="tc_no" placeholder="TC No" className="w-full p-2 border rounded" />
        <input name="phone" placeholder="Telefon" className="w-full p-2 border rounded" />
        <input name="email" placeholder="Email" className="w-full p-2 border rounded" />
        <input name="department" placeholder="Departman" className="w-full p-2 border rounded" />
        <input name="role" placeholder="Görev" className="w-full p-2 border rounded" />
        <input name="start_date" type="date" className="w-full p-2 border rounded" />

        <button disabled={loading} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded">
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </form>
    </div>
  )
}
