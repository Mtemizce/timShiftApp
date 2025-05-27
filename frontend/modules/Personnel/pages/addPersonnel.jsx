// ✅ frontend/modules/Personnel/pages/addPersonnel.jsx
import { useNavigate } from "react-router-dom"
import Topbar from "./../components/Topbar";

export default function AddPersonnel() {
  const navigate = useNavigate()

  return (
    <> 
    <Topbar />
    <form
      className="max-w-5xl mx-auto p-6  dark:bg-gray-900 rounded-lg shadow"
      onSubmit={(e) => {
        e.preventDefault()
        // submit işlemi buraya eklenecek
      }}
    >
      <h2 className="text-2xl font-bold mb-4">Yeni Personel</h2>

      <h3 className="text-lg font-semibold mb-2">👤 KİŞİSEL BİLGİLER</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Input label="Ad Soyad *" name="name" required />
        <Input label="TC Kimlik No *" name="tc_no" required />
        <Input label="Sicil No" name="registry"  />
        <Input label="Telefon *" name="phone" />
        <Input label="E-posta" name="email" />
        <Input label="Doğum Tarihi" name="birth_date" type="date" />
        <Input label="Çocuk Sayısı" name="children_count" type="number" />
        <Select label="Engel Durumu" name="hasDisability" options={["EVET", "HAYIR"]} />
        <Select label="Medeni Durum" name="marital_status" options={["Evli", "Bekar", "Boşanmış"]} />
        <Select label="Askerlik Durumu" name="militaryStatus" options={["YAPTI", "YAPMADI", "MUAF", "BEDELLİ", "TECİLLİ"]} />
        <Input label="İşe Giriş Tarihi" name="start_date" type="date" />
      </div>

      <h3 className="text-lg font-semibold mb-2">📏 BEDEN ÖLÇÜLERİ</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 mb-6">
        <Select label="Pantolon Beden" name="size_pants" options={["XS", "S", "M", "L", "XL", "2XL", "3XL"]} />
        <Select label="Tişört Beden" name="size_tshirt" options={["XS", "S", "M", "L", "XL", "2XL", "3XL"]} />
        <Select label="Mont Beden" name="size_coat" options={["XS", "S", "M", "L", "XL", "2XL", "3XL"]} />
        <Select label="Ayakkabı No" name="size_shoes" options={Array.from({ length: 14 }, (_, i) => (i + 37))} />
      </div>

      <h3 className="text-lg font-semibold mb-2">📄 DİĞER BİLGİLER</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 mb-6">
        <Input label="Adres" name="address" />
        <Select label="Adli Sicil" name="criminal_record" options={["Yok", "Var"]} />
        <Input label="Sertifikalar" name="certificates" />
        <Select label="Birim" name="department" options={["ATIK YÖNETİM BİRİMİ", "SIFIR ATIK BİRİMİ"]} />
        <Select label="Görev" name="role" options={["ŞOFÖR", "ARAÇ ARKASI", "MINTIKA", "MERKEZ WC", "MÜFTÜLÜK CAMİ WC"]} />
        <Input label="Ehliyet Sınıfı" name="driving_license" />
        <Select label="Eğitim Seviyesi" name="education_level" options={["OKUMAMIŞ", "İLK OKUL", "ORTA OKUL", "LİSE", "ÖN LİSANS", "LİSANS"]} />
        <Input label="IBAN" name="iban" />
        <Input label="Profil Fotoğrafı" name="image_file" type="file" />
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={() => navigate("/personnel")} className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white">
          Geri Dön
        </button>
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white">
          Kaydet
        </button>
      </div>
    </form>
     </>
  )
}

// 🔧 Reusable Components
const Input = ({ label, name, type = "text", required }) => (
  <label className="flex flex-col">
    <span>{label}</span>
    <input name={name} type={type} required={required} className="input" autoComplete="off" />
  </label>
)

const Select = ({ label, name, options = [] }) => (
  <label className="flex flex-col">
    <span>{label}</span>
    <select name={name} className="input" autoComplete="off">
      <option value="">Seçiniz</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </label>
)
