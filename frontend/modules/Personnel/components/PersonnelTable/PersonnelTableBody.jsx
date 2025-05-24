import { useEffect, useRef } from 'react'
import { MoreHorizontal } from 'lucide-react'
import usePersonnelStore from '@/store/personnel'

export default function PersonnelTableBody({ data, dropdownId, setDropdownId }) {
  const { visibleColumns, columns } = usePersonnelStore()
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setDropdownId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setDropdownId])

  return (
    <tbody>
      {data.map((person, index) => (
        <tr key={person.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <td className="p-2 text-sm">{index + 1}</td>

          {columns.map(({ key }) => (
            visibleColumns.includes(key) && (
              <td key={key} className="p-2 text-sm">
                {String(person[key] ?? '')}
              </td>
            )
          ))}

          <td className="p-2 text-sm text-right relative">
            <button
              onClick={() => setDropdownId(dropdownId === person.id ? null : person.id)}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {dropdownId === person.id && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-1 bg-white dark:bg-gray-800 border rounded shadow text-sm z-10"
              >
                <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">Güncelle</button>
                <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">İşten Çıkış</button>
                <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">İzin Ver</button>
              </div>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  )
}
