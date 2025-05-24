// ✅ frontend/modules/Personnel/pages/addPersonnel.jsx
import { notify } from '@/utils/notify'
export default function AddPersonnel() {
  notify("Başarılı", "Yeni personel ekleme sayfası yüklendi.", { toastr: true, duration: 3000, icon: "success" })
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold">Yeni Personel Ekle</h2>
      <p className="text-sm text-gray-600">Bu sayfa personel ekleme formunu içerecek.</p>
      
    </div>
  )
}
