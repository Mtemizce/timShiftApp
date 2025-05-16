export const LogMessages = {
  // Personel işlemleri
  CREATE_PERSONNEL: (admin, data) => `👤 ${admin} adlı admin, "${data?.name}" adlı personeli oluşturdu.`,
  UPDATE_PERSONNEL: (admin, data) => `📝 ${admin}, "${data?.name}" personel bilgilerini güncelledi.`,
  DELETE_PERSONNEL: (admin, data) => `❌ ${admin}, "${data?.name}" personel kaydını sildi.`,

  // İzin işlemleri
  REQUEST_LEAVE: (admin, data) => `📅 ${admin}, "${data?.name}" personel için ${data?.leave_type} izni ekledi.`,
  UPDATE_LEAVE: (admin, data) => `📝 ${admin}, ${data?.name} personelin izin talebini güncelledi.`,
  DELETE_LEAVE: (admin, data) => `🗑️ ${admin}, ${data?.name} personelin iznini sildi.`,

  // Auth işlemleri
  LOGIN: (admin) => `🔐 ${admin} sisteme giriş yaptı.`,
  LOGOUT: (admin) => `🚪 ${admin} sistemden çıkış yaptı.`,

  // Default fallback
  DEFAULT: (admin, method, url) => `📌 ${admin} tarafından ${method} → ${url} isteği gönderildi.`
}
