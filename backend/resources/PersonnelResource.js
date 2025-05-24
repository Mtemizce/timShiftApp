const PersonnelResource = (personnel) => ({
  id: personnel.id,
  name: personnel.name,
  tc_no: personnel.tc_no,
  birth_date: personnel.birth_date,
  address: personnel.address,
  phone: personnel.phone,
  email: personnel.email,
  marital_status: personnel.marital_status,
  criminal_record: personnel.criminal_record,
  children_count: personnel.children_count,
  driving_license: personnel.driving_license,
  education_level: personnel.education_level,
  iban: personnel.iban,
  department: personnel.department,
  certificates: personnel.certificates,
  size_pants: personnel.size_pants,
  size_tshirt: personnel.size_tshirt,
  size_coat: personnel.size_coat,
  size_shoes: personnel.size_shoes,
  start_date: personnel.start_date,
  end_date: personnel.end_date,
  role: personnel.role, 
  image_file: personnel.image_file, 
  // Diğer sensitive alanları filtreliyoruz (örnek: TC, adres, vs.)
})

export default PersonnelResource
