import ExportActions from "./ExportActions"
import { personnelColumns } from '@/store/personnelColumns'

const columnLabelMap = Object.fromEntries(personnelColumns.map(col => [col.key, col.label]))

export default function ReportTable({ filteredData, selectedColumns, customPageTitle, pageOptions }) {
  const data = Array.isArray(filteredData) ? filteredData : []

  if (data.length === 0) {
    return <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">Gösterilecek kayıt bulunamadı.</p>
  }

  return (
    <div className="mt-6">
      <div className="flex justify-end mb-4">
        <ExportActions
          data={data}
          selectedColumns={selectedColumns}
          columnLabels={columnLabelMap}
          customPageTitle={customPageTitle}
          pageOptions={pageOptions}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="reportTableHeadTr">
              <th className="reportTableHeadTh">#</th>
              {selectedColumns.map((colKey) => (
                <th key={colKey} className="reportTableHeadTh">
                  {columnLabelMap[colKey] || colKey}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="reportTableBodyTr">
                <td className="reportTableBodyTd">{idx + 1}</td>
                {selectedColumns.map((colKey) => (
                  <td key={colKey} className="reportTableBodyTd">
                    {(() => {
                      const value = row[colKey]
                      if (!value) return "-"
                      if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
                        try {
                          return new Date(value).toLocaleDateString("tr-TR")
                        } catch {
                          return value
                        }
                      }
                      return value
                    })()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
