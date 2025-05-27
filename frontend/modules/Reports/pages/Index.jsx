// frontend/modules/Reports/pages/Index.jsx
import { useState, useEffect } from 'react'
import Conditions from '../components/Conditions'
import ColumnSelector from '../components/ColumnSelector'
import CustomPageTitle from '../components/CustomPageTitle'
import PageOptions from '../components/PageOptions'
import ReportTable from '../components/ReportTable'
import { personnelColumns } from '@/store/personnelColumns'
import { Home, ListFilter, BookType, Columns3Cog } from 'lucide-react'

const labelToKeyMap = Object.fromEntries(personnelColumns.map((col) => [col.label, col.key]))
const columnKeys = personnelColumns.map((col) => col.key)

export default function ReportsIndex() {
  const [filteredData, setFilteredData] = useState([])
  const [conditions, setConditions] = useState([])
  const [selectedColumns, setSelectedColumns] = useState(columnKeys)
  const [customPageTitle, setCustomPageTitle] = useState({
    text: 'Personel Raporu',
    align: 'center',
    fontSize: 16,
    showTitle: true,
  })
  const [pageOptions, setPageOptions] = useState({
    orientation: 'portrait',
    showLogo: false,
  })
  const [activeTab, setActiveTab] = useState('columns')

  useEffect(() => {
    const storedCols = JSON.parse(localStorage.getItem('personnel-report-columns'))
    const storedTitle = JSON.parse(localStorage.getItem('personnel-report-page-title'))
    const storedPage = JSON.parse(localStorage.getItem('personnel-page-option'))
    if (storedCols) setSelectedColumns(storedCols)
    if (storedTitle) setCustomPageTitle((prev) => ({ ...prev, ...storedTitle }))
    if (storedPage) setPageOptions((prev) => ({ ...prev, ...storedPage }))
  }, [])

  const handleReport = async () => {
    try {
      const res = await fetch('/api/personnel', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      const json = await res.json()
      const result = json.data || []

      if (!conditions.length) return setFilteredData(result)

      const filtered = result.filter((row) =>
        conditions.every((cond) => {
          const key = labelToKeyMap[cond.field]
          const val = row[key]
          const op = cond.operator || '='
          const target = cond.value

          if (!key || val == null || target == null) return false

          const parseVal = (v) => {
            if (typeof v === 'string' && v.includes('T')) return new Date(v)
            if (!isNaN(v)) return Number(v)
            return v
          }

          const a = parseVal(val)
          const b = parseVal(target)

          switch (op) {
            case '=': return a == b
            case '!=': return a != b
            case '>': return a > b
            case '>=': return a >= b
            case '<': return a < b
            case '<=': return a <= b
            default: return false
          }
        })
      )

      setFilteredData(filtered)
    } catch (err) {
      console.error('Rapor verisi alınamadı:', err)
    }
  }

  return (
    <div className="w-full md:w-9/12 mx-auto flex flex-col p-2 justify-center items-center">
      {/* Sekmeler */}
      <div className="w-full mb-4">
        <div className="flex flex-wrap gap-2 mb-2">
          <button
            className={`reportTabsBtn ${activeTab === 'columns' ? 'reportTabsBtnActive' : 'reportTabsBtnNormal'}`}
            onClick={() => setActiveTab('columns')}
          >
            <Home size={18} /> Kolonlar
          </button>
          <button
            className={`reportTabsBtn ${activeTab === 'conditions' ? 'reportTabsBtnActive' : 'reportTabsBtnNormal'}`}
            onClick={() => setActiveTab('conditions')}
          >
            <ListFilter size={18} /> Filtreler
          </button>
          <button
            className={`reportTabsBtn ${activeTab === 'pagetitle' ? 'reportTabsBtnActive' : 'reportTabsBtnNormal'}`}
            onClick={() => setActiveTab('pagetitle')}
          >
            <BookType size={18} /> Üst Başlık
          </button>
          <button
            className={`reportTabsBtn ${activeTab === 'page' ? 'reportTabsBtnActive' : 'reportTabsBtnNormal'}`}
            onClick={() => setActiveTab('page')}
          >
            <Columns3Cog size={18} /> Sayfa Ayarları
          </button>
        </div>

        {/* Sekme içerikleri */}
        <div className="mt-4 w-full">
          {activeTab === 'columns' && (
            <ColumnSelector
              selectedColumns={selectedColumns}
              setSelectedColumns={setSelectedColumns}
            />
          )}
          {activeTab === 'conditions' && (
            <Conditions
              conditions={conditions}
              setConditions={setConditions}
            />
          )}
          {activeTab === 'pagetitle' && (
            <CustomPageTitle
              customPageTitle={customPageTitle}
              setCustomPageTitle={setCustomPageTitle}
            />
          )}
          {activeTab === 'page' && (
            <PageOptions
              pageOptions={pageOptions}
              setPageOptions={setPageOptions}
            />
          )}
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 my-4">
        <button onClick={handleReport} className="reportGetBtn">
          Raporu Getir
        </button>
      </div>

      {filteredData.length > 0 && (
        <ReportTable
          filteredData={filteredData}
          selectedColumns={selectedColumns}
          customPageTitle={customPageTitle}
          pageOptions={pageOptions}
        />
      )}
    </div>
  )
}
