// frontend/modules/Reports/utils/exportExcel.js
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

export const exportToExcel = async (data, selectedColumns, columnLabels, headerOptions = {}) => {
  const now = new Date().toLocaleString('tr-TR')
  const user = JSON.parse(localStorage.getItem('admin') || '{}')?.name || 'Bilinmeyen Kullanıcı'

  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Personel Raporu')

  // Kolon genişliklerini içerik uzunluğuna göre ayarla
  worksheet.columns = selectedColumns.map((key) => ({
    header: columnLabels[key] || key,
    key,
    width: Math.max(15, Math.min(35, columnLabels[key]?.length * 1.2 || 20)),
  }))

  let rowIndex = 1

  // Özel üst başlık
  if (headerOptions?.showTitle && headerOptions.text) {
    const lines = headerOptions.text.split('\n')
    lines.forEach((line) => {
      const row = worksheet.getRow(rowIndex)
      row.getCell(1).value = line
      row.getCell(1).font = {
        bold: headerOptions.bold ?? true,
        size: headerOptions.fontSize || 14,
        color: { argb: (headerOptions.textColor || '#000000').replace('#', 'FF') },
      }
      row.getCell(1).alignment = {
        horizontal: headerOptions.align || 'center',
        vertical: 'middle',
        wrapText: true,
      }
      row.height = 20
      worksheet.mergeCells(rowIndex, 1, rowIndex, selectedColumns.length)
      row.getCell(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: (headerOptions.bgColor || '#FFFFFF').replace('#', 'FF') },
      }
      rowIndex++
    })
  }

  rowIndex++

  // Kolon başlıkları
  const headerRow = worksheet.getRow(rowIndex++)
  selectedColumns.forEach((key, idx) => {
    const cell = headerRow.getCell(idx + 1)
    cell.value = columnLabels[key] || key
    cell.font = { bold: true, size: 12 }
    cell.alignment = { horizontal: 'center', vertical: 'middle' }
    cell.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' },
    }
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD9D9D9' },
    }
  })

  // Veriler (zebra + wrap + border)
  data.forEach((row, i) => {
    const excelRow = worksheet.getRow(rowIndex++)
    selectedColumns.forEach((key, idx) => {
      const val = row[key]
      const isDate = typeof val === 'string' && /^\d{4}-\d{2}-\d{2}/.test(val)
      const formatted = isDate ? new Date(val).toLocaleDateString('tr-TR') : val ?? ''

      const cell = excelRow.getCell(idx + 1)
      cell.value = formatted
      cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
      cell.font = { size: 10 }
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
      }
      if (i % 2 === 1) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF3F3F3' },
        }
      }
    })
    excelRow.height = 20
  })

  rowIndex += 2

  // Alt bilgi (düzenleyen, tarih, kayıt sayısı)
  const footerLines = [
    `Düzenleyen: ${user}`,
    `Tarih: ${now}`,
    `Toplam Kayıt: ${data.length}`,
  ]

  footerLines.forEach((line) => {
    const row = worksheet.getRow(rowIndex++)
    row.getCell(1).value = line
    row.getCell(1).alignment = { horizontal: 'left' }
    row.font = { italic: true, size: 10 }
    worksheet.mergeCells(row.number, 1, row.number, selectedColumns.length)
  })

  const buffer = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buffer]), 'personel_raporu.xlsx')
}
