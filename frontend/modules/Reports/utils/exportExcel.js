// frontend/modules/Reports/utils/exportExcel.js
import * as XLSX from "xlsx"

export const exportToExcel = (data, selectedColumns, columnLabels, headerOptions = {}) => {
  const now = new Date().toLocaleString("tr-TR")
  const user = JSON.parse(localStorage.getItem("admin") || "{}")?.name || "Bilinmeyen Kullanıcı"

  const sheetData = []

  // Üst başlık
  if (headerOptions?.showTitle && headerOptions.text) {
    const mergedTitle = [headerOptions.text]
    sheetData.push(mergedTitle)
    sheetData.push([])
  }

  // Başlıklar
  sheetData.push(selectedColumns.map((col) => columnLabels[col] || col))

  // Veriler
  sheetData.push(
    ...data.map((row) =>
      selectedColumns.map((col) => {
        const val = row[col]
        return typeof val === "string" && /^\d{4}-\d{2}-\d{2}/.test(val)
          ? new Date(val).toLocaleDateString("tr-TR")
          : val ?? ""
      })
    )
  )

  // Alt bilgi
  sheetData.push([])
  sheetData.push([`Düzenleyen: ${user}`])
  sheetData.push([`Tarih: ${now}`])
  sheetData.push([`Toplam Kayıt: ${data.length}`])

  const ws = XLSX.utils.aoa_to_sheet(sheetData)

  // Başlığı tüm kolonlara yay (merge)
  if (headerOptions?.showTitle && headerOptions.text) {
    const range = XLSX.utils.decode_range(ws['!ref'])
    const merge = [{ s: { r: 0, c: 0 }, e: { r: 0, c: selectedColumns.length - 1 } }]
    ws['!merges'] = merge
    ws['A1'].s = { alignment: { horizontal: "center" }, font: { bold: true, sz: 14 } }
  }

  // Hücre stilleri için sınır tanımı
  Object.keys(ws).forEach((cell) => {
    if (cell.startsWith('!')) return
    ws[cell].s = {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } }
      }
    }
  })

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "Rapor")
  XLSX.writeFile(wb, "personel_raporu.xlsx")
}
