// ✅ frontend/modules/Personnel/components/PersonnelTable/PersonnelTableHeader.jsx (revize: toggle fullscreen butonu)
import { Maximize2 } from 'lucide-react'
import usePersonnelStore from '@/store/personnel'
import { useEffect, useRef, useState } from 'react'

const columnOptions = [
  { key: 'name', label: 'Ad Soyad' },
  { key: 'phone', label: 'Telefon' },
  { key: 'department', label: 'Departman' },
  { key: 'role', label: 'Görev' }
]

export default function PersonnelTableHeader() {
  const { visibleColumns, toggleColumn, setVisibleColumns, setFullscreen } = usePersonnelStore()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const stored = localStorage.getItem('personnel_visible_columns')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setVisibleColumns(parsed)
        }
      } catch {
        console.warn('Kolonlar okunamadı')
      }
    }
  }, [setVisibleColumns])

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleToggle = (key) => {
    toggleColumn(key)
    const updated = visibleColumns.includes(key)
      ? visibleColumns.filter((col) => col !== key)
      : [...visibleColumns, key]
    localStorage.setItem('personnel_visible_columns', JSON.stringify(updated))
  }

  const toggleFullscreen = () => {
  const wrapper = document.getElementById('table-wrapper')

  if (!document.fullscreenElement && wrapper?.requestFullscreen) {
    wrapper.requestFullscreen()
  } else if (document.fullscreenElement && document.exitFullscreen) {
    document.exitFullscreen()
  }
}


  return (
    <div className="flex justify-between items-center mb-4">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="px-3 py-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
        >
          Kolonlar
        </button>
        {dropdownOpen && (
          <div className="absolute mt-1 w-52 bg-white dark:bg-gray-800 border rounded shadow z-20 p-2">
            {columnOptions.map((col) => (
              <label
                key={col.key}
                className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer text-sm"
              >
                <input
                  type="checkbox"
                  checked={visibleColumns.includes(col.key)}
                  onChange={() => handleToggle(col.key)}
                />
                {col.label}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
          title="Tam ekran"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
