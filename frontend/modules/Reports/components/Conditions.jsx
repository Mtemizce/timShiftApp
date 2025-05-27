// frontend/modules/Reports/components/Conditions.jsx
import { useEffect } from 'react'
import { useDefinitionsStore } from '@/store/definitionsStore'
import { personnelColumns } from '@/store/personnelColumns'
import { PlusCircle, Trash2 } from 'lucide-react'

export default function Conditions({ conditions, setConditions }) {
  const { definitions, fetchDefinitions } = useDefinitionsStore()

  useEffect(() => {
    fetchDefinitions()
  }, [])

  const getOptionsFromDefinitions = (key) => {
    return definitions
      .filter((d) => d.type === key && d.active)
      .map((d) => d.key)
  }

  const enrichedColumns = personnelColumns.map((col) => {
    if (col.dynamic) {
      return {
        ...col,
        options: getOptionsFromDefinitions(col.key)
      }
    }
    return col
  })

  const handleAdd = () => {
    setConditions([...conditions, { field: '', operator: '=', value: '' }])
  }

  const handleRemove = (index) => {
    const updated = [...conditions]
    updated.splice(index, 1)
    setConditions(updated)
  }

  const handleChange = (index, key, value) => {
    const updated = [...conditions]
    updated[index][key] = value
    setConditions(updated)
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
        {conditions.map((cond, index) => {
          const selectedCol = enrichedColumns.find((c) => c.label === cond.field)
          return (
            <div key={index} className="flex gap-2 items-center justify-around">
              {/* Alan Seçimi */}
              <select
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                value={cond.field}
                onChange={(e) => handleChange(index, 'field', e.target.value)}
              >
                <option value="">Alan Seç</option>
                {enrichedColumns.map((col) => (
                  <option key={col.key} value={col.label}>
                    {col.label}
                  </option>
                ))}
              </select>

              {/* Operatör Seçimi */}
              <select
                className="w-24 border border-gray-300 rounded px-2 py-1 text-sm"
                value={cond.operator || '='}
                onChange={(e) => handleChange(index, 'operator', e.target.value)}
              >
                <option value="=">=</option>
                <option value=">">&gt;</option>
                <option value=">=">&ge;</option>
                <option value="<">&lt;</option>
                <option value="<=">&le;</option>
                <option value="!=">&ne;</option>
              </select>

              {/* Değer Seçimi */}
              {selectedCol?.type === 'select' ? (
                <select
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  value={cond.value}
                  onChange={(e) => handleChange(index, 'value', e.target.value)}
                >
                  <option value="">Değer Seç</option>
                  {(selectedCol.options || []).map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : selectedCol?.type === 'date' ? (
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  value={cond.value}
                  onChange={(e) => handleChange(index, 'value', e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  value={cond.value}
                  onChange={(e) => handleChange(index, 'value', e.target.value)}
                  placeholder="Değer girin"
                />
              )}

              <button onClick={() => handleRemove(index)}>
                <Trash2 size={16} />
              </button>
            </div>
          )
        })}

        <button
          onClick={handleAdd}
          className="flex font-bold text-sm items-center gap-1 text-blue-600 mt-1 cursor-pointer group transition-colors duration-300"
        >
          <PlusCircle size={16} className="group-hover:text-red-500" />
          Koşul Ekle
        </button>
      </div>
    </div>
  )
}
