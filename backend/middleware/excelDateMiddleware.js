// ✅ backend/middlewares/excelDateMiddleware.js

export const normalizeExcelDates = (req, res, next) => {
  const convertExcelDate = (value) => {
    if (typeof value === 'number' && !isNaN(value)) {
      const date = new Date((value - 25569) * 86400 * 1000)
      return isNaN(date.getTime()) ? undefined : date.toISOString().split('T')[0]
    }
    return undefined // null, boş string vs. hepsini yok say
  }

  if (Array.isArray(req.body.data)) {
    console.log("🧪 Orijinal input:", JSON.stringify(req.body.data[0], null, 2))

    req.body.data = req.body.data.map((row) => ({
      ...row,
      start_date: convertExcelDate(row.start_date),
      end_date: convertExcelDate(row.end_date),
      birth_date: convertExcelDate(row.birth_date)
    }))

    console.log("✅ Dönüştürülmüş input:", JSON.stringify(req.body.data[0], null, 2))
  }

  next()
}
