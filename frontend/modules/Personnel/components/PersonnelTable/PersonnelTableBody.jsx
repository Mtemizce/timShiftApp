// frontend/modules/Personnel/components/PersonnelTable/PersonnelTableBody.jsx

import { MoreHorizontal } from 'lucide-react'
import usePersonnelStore from '@/store/personnel'

export default function PersonnelTableBody({ data, dropdownId, setDropdownId }) {
  const { visibleColumns } = usePersonnelStore()

  return (
    <tbody>
      {data.map((person, index) => (
        <tr key={person.id} className="border-b hover:bg-gray-50">
          <td className="p-2 text-sm">{index + 1}</td>
          {visibleColumns.includes('name') && <td className="p-2 text-sm">{person.name}</td>}
          {visibleColumns.includes('phone') && <td className="p-2 text-sm">{person.phone}</td>}
          {visibleColumns.includes('department') && <td className="p-2 text-sm">{person.department}</td>}
          {visibleColumns.includes('role') && <td className="p-2 text-sm">{person.role}</td>}
          <td className="p-2 text-sm text-right relative">
            <button
              onClick={() => setDropdownId(dropdownId === person.id ? null : person.id)}
              className="p-1 rounded hover:bg-gray-200"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {dropdownId === person.id && (
              <div className="absolute right-0 mt-1 bg-white border rounded shadow text-sm z-10">
                <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left">Güncelle</button>
                <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left">İşten Çıkış</button>
                <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left">İzin Ver</button>
              </div>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  )
}
