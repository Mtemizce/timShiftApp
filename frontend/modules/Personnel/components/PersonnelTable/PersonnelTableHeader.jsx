// frontend/modules/Personnel/components/PersonnelTable/PersonnelTableHeader.jsx

import { Maximize2, Eye, EyeOff, Search } from 'lucide-react'
import usePersonnelStore from '@/store/personnel'
import { useRef, useState } from 'react'

export default function PersonnelTableHeader() {
  const { searchText, setSearchText, visibleColumns, toggleColumn, setFullscreen } = usePersonnelStore()
  const [showColumns, setShowColumns] = useState(false)
  const columns = ['name', 'phone', 'department', 'role']

  const handleFullscreen = () => {
    const elem = document.documentElement
    if (!document.fullscreenElement) {
      elem.requestFullscreen()
      setFullscreen(true)
    } else {
      document.exitFullscreen()
      setFullscreen(false)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
      <div className="flex gap-2 items-center">
        <button
          onClick={handleFullscreen}
          className="text-sm px-3 py-1 rounded bg-blue-200 hover:bg-blue-300 flex items-center"
        >
          <Maximize2 className="w-4 h-4 mr-1" />
          Tam Ekran
        </button>

        <div className="relative">
          <button
            onClick={() => setShowColumns(!showColumns)}
            className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
          >
            Kolonlar
          </button>
          {showColumns && (
            <div className="absolute z-10 bg-white shadow border rounded mt-1 p-2 w-40">
              {columns.map((col) => (
                <label key={col} className="flex items-center text-sm gap-2 mb-1">
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(col)}
                    onChange={() => toggleColumn(col)}
                  />
                  {col}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-2 top-2 w-4 h-4 text-gray-500" />
        <input
          type="search"
          placeholder="Personel ara..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="pl-8 pr-4 py-1.5 rounded border border-gray-300 text-sm w-full sm:w-64"
        />
      </div>
    </div>
  )
}
