import { useEffect, useState } from 'react'
import { useSystemConfigStore } from '@/store/systemConfig'
import { Loader2, Save, CheckCircle, XCircle } from 'lucide-react'

export default function SettingsPage() {
  const { configs, loadConfigs, updateConfigs, loading } = useSystemConfigStore()
  const [values, setValues] = useState({})

  useEffect(() => {
    loadConfigs()
  }, [])

  useEffect(() => {
    const obj = {}
    configs.forEach((c) => (obj[c.key] = c.value))
    setValues(obj)
  }, [configs])

  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = () => {
    const items = Object.entries(values).map(([key, value]) => ({ key, value }))
    updateConfigs(items)
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Sistem Ayarları</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium">Oturum Süresi (Dakika)</label>
          <input
            type="number"
            value={values.SESSION_TIMEOUT_MINUTES || ''}
            onChange={(e) => handleChange('SESSION_TIMEOUT_MINUTES', e.target.value)}
            className="input"
          />
        </div>

        <div>
          <label className="block font-medium">Süre Kaynağı</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleChange('SESSION_TIMEOUT_SOURCE', 'db')}
              className={`btn ${values.SESSION_TIMEOUT_SOURCE === 'db' ? 'bg-green-600 text-white' : ''}`}
            >
              DB'den Al
            </button>
            <button
              onClick={() => handleChange('SESSION_TIMEOUT_SOURCE', 'env')}
              className={`btn ${values.SESSION_TIMEOUT_SOURCE === 'env' ? 'bg-blue-600 text-white' : ''}`}
            >
              .env'den Al
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="btn bg-black text-white mt-6 flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Save size={16} />}
          Kaydet
        </button>
      </div>
    </div>
  )
}