# 🛠️ TimShiftApp Backend (Node.js + Express)

## 🎯 Proje Amacı

TimShiftApp,  çalışan personelin:

* İşe giriş / çıkış işlemleri,
* Görev tipi ve envanter yönetimi,
* İzin süreçleri,
* Günlük puantaj ve mesai takibi,
* Yetki kontrollü panel erişimi,
* Gelişmiş loglama ve dinamik ayar yönetimi

işlemlerini merkezi ve güvenli bir backend altyapısıyla yönetmeyi hedefler.

---

## 🏗️ Sistem Mimarisi

* **Dil & Platform:** Node.js + Express.js (ESM modüller)
* **Veritabanı:** MySQL (Sequelize ORM)
* **Kimlik Doğrulama:** JWT + Blacklist + Session DB
* **Yetkilendirme:** Role & Permission tabanlı 
* **Loglama:** Modül & Action bazlı, Queue sistemli log kaydı
* **Dosya Yapısı:** SRP prensipli modül bazlı dizilim
* **Postman Testleri:** Otomatik token, session bazlı

---

## 📂 Klasör Yapısı

```
├─cli/                      # Seeder ve helper CLI script'leri
├─frontend/                 # Frontend (Reactjs + TailwindCss + Lucide Icons)
├─backend/                  # Backend Rest Api (Node.js + Express)
|    ├─ config/             # DB bağlantı ayarları
|    ├── controllers/       # HTTP request işleyicileri
|    ├── helpers/
|    ├── middleware/        # auth, permission, log, vb. middleware'ler
|    ├── models/            # Sequelize modelleri (Admin, Role, Session, vb.)
|    ├── resources/         # API response serializer'ları
|    ├── routes/            # Modül bazlı route tanımları
|    ├── services/          # İş mantığı soyutlamaları
|    ├── app.js             # Express app tanımı
|    └── server.js          # Sunucu ayağa kaldırma noktası
├─.env.example              # Ortam değişkenleri
├─package.json              # Paket yönetimi
└─vite.config.js            # Vite yapılandırma dosyası (frontend, backend ve env yapılandırması uygulandı.)
```

---
## 🧾 Package.json Dependencies:
```
"dependencies": {
    "bcryptjs": "^3.0.2",
    "cors": "^2.8.5",
    "dotenv": "^16.5.0",
    "express": "^5.1.0",
    "jsonwebtoken": "^9.0.2",
    "mysql2": "^3.14.1",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "sequelize": "^6.37.7"
  },
  "devDependencies": {
    "@eslint/js": "^9.25.0",
    "@tailwindcss/vite": "^4.1.6",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "@vitejs/plugin-react": "^4.4.1",
    "eslint": "^9.25.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^16.0.0",
    "tailwindcss": "^4.1.6",
    "vite": "^6.3.5"
  }
```
---
## 🧾Package.json Scriptler:
```
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "dev:backend": "node backend/server.js",
    "dev:frontend": "vite --config vite.config.js",
    "db:init": "node cli/init-db.js",
    "add:admin": "node cli/add-admin.js",
    "session:clear": "node cli/clear-tokens.js",
    "seed:definitions": "node cli/init-definitions.js",
    "seed:config": "node cli/init-system-config.js",
    "seed:roles": "node cli/init-roles.js",
    "seed:permissions": "node cli/init-permissions.js",
    "seed:role-permissions": "node cli/init-role-permissions.js"
  },
```
---

## 🔐 Auth Sistemi

* JWT tabanlı token üretilir
* `BlacklistToken` tablosuyla logout işlemleri takip edilir
* `Session` tablosuyla kullanıcı başına oturum kaydı tutulur
* Aynı kullanıcıya yeniden token verilmez, kalan süreyle geri dönülür

```json
{
  "token": "eyJhbGci...",
  "reused": true,
  "message": "Oturumunuz zaten açık. Kalan süreniz: 26 dk"
}
```

---

## 🧾 Role & Permission Sistemi

* Roller (`Role`) ve yetkiler (`Permission`) ayrı tablolarda tutulur
* `AdminRole`, `RolePermission` pivot tablolarıyla ilişkilendirilir
* Route’lar `permissionMiddleware` ile korunur
* Her işlem öncesi `authenticateToken` çalışır

---

## 🧠 Log Sistemi

* Tüm veri değiştiren işlemler `logActivityMiddleware` ile otomatik loglanır
* Loglar: `ActivityLog` tablosunda tutulur
* Log mesajları: `logMessages.js` içinden şablonlarla üretilir
* Middleware async queue ile çalışır

---

## 📬 Ana Rotalar

### 🔐 Auth

| Yöntem | Route        | Açıklama                |
| ------ | ------------ | ----------------------- |
| POST   | /auth/login  | Giriş yap               |
| POST   | /auth/logout | Oturumu sonlandır       |
| GET    | /auth/me     | Aktif kullanıcı bilgisi |

### 👤 Personel

| Yöntem | Route           | Permission       |
| ------ | --------------- | ---------------- |
| GET    | /personnel      | personnel.view   |
| POST   | /personnel      | personnel.create |
| PUT    | /personnel/\:id | personnel.update |
| DELETE | /personnel/\:id | personnel.delete |

### 📋 Tanımlar (Definition)

| Yöntem | Route               | Permission        |
| ------ | ------------------- | ----------------- |
| GET    | /definitions/\:type | definition.view   |
| POST   | /definitions        | definition.create |
| PUT    | /definitions/\:id   | definition.update |
| DELETE | /definitions/\:id   | definition.delete |

### ⚙️ Sistem Ayarları

| Yöntem | Route          | Permission    |
| ------ | -------------- | ------------- |
| GET    | /system-config | config.view   |
| PUT    | /system-config | config.update |

---

## 🪛 CLI Komutları

```bash
npm run db:init                # DB tablolarını oluşturur
npm run seed:roles             # Rol tanımlarını ekler
npm run seed:permissions       # Yetkileri ekler
npm run seed:role-permissions  # Rol-yetki eşlemelerini yapar
npm run add:admin              # Terminalden yeni admin ekler
```

---

## 🚧 Devam Edenler / Planlananlar

* [ ] Frontend React entegrasyonu (Token yönetimi, UI yetki bazlı görünüm)
* [ ] Tanım / Ayar ekranlarının dinamik panelden yönetimi
* [ ] Log kayıtlarının admin panelde listelenmesi
* [ ] Excel ile toplu personel import / export
* [ ] Oturum sonlandırma (aktif session listeleme & kill)
* [ ] Cron tabanlı veritabanı yedekleme & kuyruk kontrol

---

Bu backend sistem hem geliştirici dostu, hem de kurumsal uygulamalara hazır mimariyle inşa edilmiştir.

Her login, her hareket ve her yetki kontrollü adım loglanır, kontrol edilir ve sistem tarafından izlenir 🔐
