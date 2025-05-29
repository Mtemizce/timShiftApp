// ✅ components/PersonnelFormFields.jsx
import PersonnelPhotoUpload from "./PersonnelPhotoUpload";

const Input = ({ label, name, type = "text", defaultValue = "", required = false }) => (
  <label className="flex flex-col">
    <span>{label}</span>
    <input
      name={name}
      type={type}
      defaultValue={defaultValue}
      required={required}
      className="input"
      autoComplete="off"
    />
  </label>
);

const Select = ({ label, name, options = [], defaultValue = "" }) => (
  <label className="flex flex-col">
    <span>{label}</span>
    <select name={name} className="input" defaultValue={defaultValue}>
      <option value="">Seçiniz</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </label>
);

export default function PersonnelFormFields({ definitions = {}, defaultValues = {}, loading = false }) {
  return (
    <>
      <h3 className="text-lg font-semibold mb-2">👤 KİŞİSEL BİLGİLER</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Input name="name" label="Ad Soyad *" required defaultValue={defaultValues.name} />
        <Input name="tc_no" label="TC Kimlik No *" required defaultValue={defaultValues.tc_no} />
        <Input name="registry" label="Sicil No" defaultValue={defaultValues.registry} />
        <Input name="phone" label="Telefon *" defaultValue={defaultValues.phone} />
        <Input name="email" label="E-posta" defaultValue={defaultValues.email} />
        <Input name="birth_date" label="Doğum Tarihi" type="date" defaultValue={defaultValues.birth_date} />
        <Input name="children_count" label="Çocuk Sayısı" type="number" defaultValue={defaultValues.children_count} />
        <Select name="hasDisability" label="Engel Durumu" options={["EVET", "HAYIR"]} defaultValue={defaultValues.hasDisability} />
        <Select name="marital_status" label="Medeni Durum" options={["Evli", "Bekar", "Boşanmış"]} defaultValue={defaultValues.marital_status} />
        <Select name="militaryStatus" label="Askerlik Durumu" options={definitions?.militaryStatus} defaultValue={defaultValues.militaryStatus} />
        <Input name="start_date" label="İşe Giriş Tarihi" type="date" defaultValue={defaultValues.start_date} />
        <Input name="end_date" label="Çıkış Tarihi" type="date" defaultValue={defaultValues.end_date} />
      </div>

      <h3 className="text-lg font-semibold mb-2">📏 BEDEN ÖLÇÜLERİ</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Select name="size_pants" label="Pantolon Beden" options={definitions?.size_pants} defaultValue={defaultValues.size_pants} />
        <Select name="size_tshirt" label="Tişört Beden" options={definitions?.size_tshirt} defaultValue={defaultValues.size_tshirt} />
        <Select name="size_coat" label="Mont Beden" options={definitions?.size_coat} defaultValue={defaultValues.size_coat} />
        <Select name="size_shoes" label="Ayakkabı No" options={definitions?.size_shoes} defaultValue={defaultValues.size_shoes} />
      </div>

      <h3 className="text-lg font-semibold mb-2">📄 DİĞER BİLGİLER</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Input name="address" label="Adres" defaultValue={defaultValues.address} />
        <Select name="criminal_record" label="Adli Sicil" options={["EVET", "HAYIR"]} defaultValue={defaultValues.criminal_record} />
        <Input name="certificates" label="Sertifikalar" defaultValue={defaultValues.certificates} />
        <Select name="department" label="Birim" options={definitions?.department} defaultValue={defaultValues.department} />
        <Select name="role" label="Görev" options={definitions?.role} defaultValue={defaultValues.role} />
        <Input name="driving_license" label="Ehliyet Sınıfı" defaultValue={defaultValues.driving_license} />
        <Select name="education_level" label="Eğitim Seviyesi" options={definitions?.education_level} defaultValue={defaultValues.education_level} />
        <Input name="iban" label="IBAN" defaultValue={defaultValues.iban} />
        <PersonnelPhotoUpload defaultValue={defaultValues.image_file} />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
        >
          Geri Dön
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
          disabled={loading}
        >
          {loading ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
    </>
  );
}
