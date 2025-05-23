// ✅ frontend/modules/Personnel/pages/addMultiplePersonnel.jsx (revize: token header + dosya bilgisi gösterimi)
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as XLSX from 'xlsx'
import Swal from 'sweetalert2'

export default function AddMultiplePersonnel() {
  const navigate = useNavigate()
  const [parsedData, setParsedData] = useState([])
  const [dragging, setDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFile = (file) => {
    setSelectedFile(file)
    const reader = new FileReader()
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const json = XLSX.utils.sheet_to_json(worksheet)
      setParsedData(json)
    }
    reader.readAsArrayBuffer(file)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) handleFile(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleSubmit = async () => {
    if (!parsedData.length) return Swal.fire('Uyarı', 'Geçerli bir dosya yükleyin', 'warning')

    try {
      const res = await fetch('/api/personnel/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ data: parsedData })
      })

      if (!res.ok) throw new Error('Hatalı veri gönderimi')
      const result = await res.json()

      Swal.fire('Başarılı', `${result.inserted} personel başarıyla eklendi`, 'success')
        .then(() => navigate('/personnel'))
    } catch (err) {
      console.error(err)
      Swal.fire('Hata', 'Veriler işlenemedi', 'error')
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Excel ile Çoklu Personel Ekle</h2>

      <div className="border rounded p-4 bg-white dark:bg-gray-800">
        <p className="mb-2">📥 Şablonu indir ve doldur:</p>
        <a
          href="/assets/personnel-template.xlsx"
          download
          className="text-blue-600 underline dark:text-blue-400"
        >
          Şablon Dosyayı İndir
        </a>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        className={`border-2 border-dashed rounded p-8 text-center transition-all
        ${dragging ? 'border-blue-600 bg-blue-50 dark:bg-gray-700' : 'border-gray-400'}`}
      >
        <p className="mb-2">Dosyanızı buraya sürükleyin veya tıklayarak seçin</p>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="hidden"
          id="excel-upload"
        />
        <label htmlFor="excel-upload" className="cursor-pointer text-blue-600 underline dark:text-blue-400">
          Dosya Seç
        </label>

        {selectedFile && (
          <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
            <p>📄 <strong>{selectedFile.name}</strong> ({(selectedFile.size / 1024).toFixed(1)} KB)</p>
            <p>📊 {parsedData.length} satır yüklendi</p>
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
      >
        Kaydet ve Gönder
      </button>
    </div>
  )
}
