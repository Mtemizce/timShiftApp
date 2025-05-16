const PersonnelResource = (personnel) => ({
  id: personnel.id,
  name: personnel.name,
  phone: personnel.phone,
  email: personnel.email,
  department: personnel.department,
  start_date: personnel.start_date,
  size: {
    pants: personnel.size_pants,
    tshirt: personnel.size_tshirt,
    coat: personnel.size_coat,
    shoes: personnel.size_shoes,
  }
  // Diğer sensitive alanları filtreliyoruz (örnek: TC, adres, vs.)
})

export default PersonnelResource
