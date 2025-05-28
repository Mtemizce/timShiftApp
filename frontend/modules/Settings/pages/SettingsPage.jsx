import { useEffect, useState } from "react"
import { getSystemConfig, updateSystemConfig } from "./../services/systemConfigService"
import { notify } from "@/utils/notify"
import { CheckCircle, XCircle } from "lucide-react"

export default function SettingsPage() {
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchConfig = async () => {
    try {
      const data = await getSystemConfig()
      setConfig(data)
    } catch (err) {
      notify("Hata", "Ayarlar alınamadı", { toastr: true, duration: 4000, icon: "error" })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target
    setConfig((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const toggleUseDbSession = () => {
    setConfig((prev) => ({
      ...prev,
      use_db_session_time: !prev.use_db_session_time
    }))
  }

  const handleSubmit = async () => {
    try {
      await updateSystemConfig(config)
      notify("Başarılı", "Ayarlar güncellendi", { toastr: true, duration: 4000, icon: "success" })
    } catch (err) {
      notify("Hata", "Güncelleme başarısız", { toastr: true, duration: 4000, icon: "error" })
    }
  }

  useEffect(() => {
    fetchConfig()
  }, [])

  if (loading) return <p className="text-muted">Yükleniyor...</p>
  if (!config) return null

  return (
    <div className="p-6 space-y-6 max-w-5xl bg-white rounded-md mx-auto">
      <h2 className="text-xl font-bold">Sistem Ayarları</h2>

      <div className="grid gap-4">
        <div>
          <label className="block font-semibold mb-1">Oturum Süresi (dakika)</label>
          <input
            type="number"
            name="admin_session_minutes"
            value={config.admin_session_minutes}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleUseDbSession}
            className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition ${
              config.use_db_session_time
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
          >
            {config.use_db_session_time ? <CheckCircle size={16} /> : <XCircle size={16} />}
            {config.use_db_session_time ? "DB'den alınıyor" : "Env'den alınıyor"}
          </button>
          <span className="text-sm text-gray-500">(Oturum süresi kaynağı)</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="clear_blacklist_on_logout"
            checked={config.clear_blacklist_on_logout}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label className="font-medium">Çıkışta token listesini temizle</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="enable_backup"
            checked={config.enable_backup}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label className="font-medium">Otomatik yedeklemeyi etkinleştir</label>
        </div>

        <div>
          <label className="block font-semibold mb-1">Yedekleme Aralığı (saat)</label>
          <input
            type="number"
            name="backup_interval_hours"
            value={config.backup_interval_hours}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        <div className="text-sm text-muted-foreground italic">
          Son Yedekleme:{" "}
          {config.last_backup_at
            ? new Date(config.last_backup_at).toLocaleString("tr-TR")
            : "Henüz alınmamış"}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition"
      >
        Kaydet
      </button>
    </div>
  )
}
