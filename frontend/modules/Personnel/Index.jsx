// ✅ frontend/modules/Personnel/Index.jsx (tam entegre, bug fix'li, responsive)
import { useState, useMemo } from 'react'
import Topbar from './components/Topbar'
import Widget from '../../components/Widget'
import PersonnelTableHeader from './components/PersonnelTable/PersonnelTableHeader'
import PersonnelTableBody from './components/PersonnelTable/PersonnelTableBody'
import PersonnelTablePagination from './components/PersonnelTable/PersonnelTablePagination'

import usePersonnelStore from '@/store/personnel'
import { Users, UserCheck, Truck } from 'lucide-react'

const MOCK_DATA = [
  { id: 1, name: 'Ali Veli', phone: '0555 111 22 33', department: 'Ulaşım', role: 'Şoför' },
  { id: 2, name: 'Ayşe Kaya', phone: '0555 444 55 66', department: 'Temizlik', role: 'Mıntıka' },
  { id: 3, name: 'Mehmet Can', phone: '0555 777 88 99', department: 'Zabıta', role: 'Zabıta' },
  { id: 4, name: 'Zehra Yıldız', phone: '0555 000 11 22', department: 'Ulaşım', role: 'Şoför' },
  { id: 5, name: 'Osman Koç', phone: '0555 333 44 55', department: 'İdari', role: 'Memur' },
]

export default function PersonnelIndex() {
  const [dropdownId, setDropdownId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const { searchText } = usePersonnelStore()

  const filteredData = useMemo(() => {
    return MOCK_DATA.filter((person) =>
      Object.values(person).some((val) =>
        String(val).toLowerCase().includes(searchText.toLowerCase())
      )
    )
  }, [searchText])

  return (
    <div className="space-y-6">
      <Topbar />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Widget title="Toplam Personel" value={MOCK_DATA.length} icon={<Users />} color="bg-blue-600" />
        <Widget title="Aktif Personel" value={MOCK_DATA.length - 1} icon={<UserCheck />} color="bg-green-600" />
        <Widget title="Şoför Sayısı" value={2} icon={<Truck />} color="bg-yellow-600" />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded shadow p-4 overflow-x-auto">
        <PersonnelTableHeader />

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
              <th className="p-2">#</th>
              {['name', 'phone', 'department', 'role'].map((col) => (
                usePersonnelStore.getState().visibleColumns.includes(col) && (
                  <th key={col} className="p-2 capitalize">{col}</th>
                )
              ))}
              <th className="p-2 text-right">İşlemler</th>
            </tr>
          </thead>
          <PersonnelTableBody
            data={filteredData}
            dropdownId={dropdownId}
            setDropdownId={setDropdownId}
          />
        </table>

        <PersonnelTablePagination
          total={filteredData.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}
