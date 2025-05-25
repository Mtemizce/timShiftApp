// frontend/modules/Reports/utils/exportPrint.js

export const exportToPrint = (data, selectedColumns, columnLabels, headerOptions = {}) => {
  const now = new Date().toLocaleString("tr-TR")
  const user = JSON.parse(localStorage.getItem("admin") || "{}")?.name || "Bilinmeyen Kullanıcı"

  const tableHTML = `
    <table>
      <thead><tr>
        ${selectedColumns.map((col) => `<th>${columnLabels[col] || col}</th>`).join("")}
      </tr></thead>
      <tbody>
        ${data
          .map(
            (row) =>
              `<tr>${selectedColumns
                .map((col) => {
                  const val = row[col]
                  const formatted = typeof val === "string" && /^\d{4}-\d{2}-\d{2}/.test(val)
                    ? new Date(val).toLocaleDateString("tr-TR")
                    : val
                  return `<td>${formatted ?? ""}</td>`
                })
                .join("")}</tr>`
          )
          .join("")}
      </tbody>
    </table>`

  const printWindow = window.open("", "_blank")
  printWindow.document.write(`
    <html>
    <head>
      <title>Yazdır</title>
      <style>
        @page {
          size: ${headerOptions.orientation || 'portrait'};
        }
        body { font-family: Arial, sans-serif; padding: 20px; }
        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 12px; }
        h2 { text-align: ${headerOptions.align || "left"}; font-size: ${headerOptions.fontSize || 16}px; margin-bottom: 20px; color: ${headerOptions.textColor || "#000"}; background-color: ${headerOptions.bgColor || "#fff"}; padding: 10px; }
      </style>
    </head>
    <body>
      ${
        headerOptions?.showTitle && headerOptions.text
          ? `<h2>${headerOptions.text.replace(/\n/g, "<br>")}</h2>`
          : ""
      }
      ${tableHTML}
      <div style="margin-top: 20px;">
        <p>Düzenleyen: ${user}</p>
        <p>Tarih: ${now}</p>
        <p>Toplam Kayıt: ${data.length}</p>
      </div>
      <script>window.print(); setTimeout(() => window.close(), 3000);</script>
    </body>
    </html>`)
  printWindow.document.close()
}
