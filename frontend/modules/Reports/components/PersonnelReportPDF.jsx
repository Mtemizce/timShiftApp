// frontend/modules/Reports/components/PersonnelReportPDF.jsx
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font
} from '@react-pdf/renderer'
import font from '../../../../public/fonts/Roboto-Regular.ttf'

Font.register({ family: 'Roboto', src: font })

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    fontSize: 9,
    padding: 20,
  },
  titleBlock: {
    marginBottom: 8,
    padding: 6,
  },
  titleText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#d9d9d9',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#bfbfbf',
    padding: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 9,
  },
  tableCell: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#bfbfbf',
    padding: 5,
    textAlign: 'center',
    fontSize: 8,
  },
  zebraRow: {
    backgroundColor: '#f3f3f3',
  },
  footer: {
    marginTop: 20,
    fontSize: 8,
  },
})

const PersonnelReportPDF = ({ data = [], selectedColumns = [], columnLabels = {}, customPageTitle = '', pageOptions = {} }) => {
  const orientation = pageOptions?.orientation || 'portrait'

  const titleText = typeof customPageTitle === 'object' ? customPageTitle.text : (customPageTitle || '')
  const bgColor = customPageTitle?.bgColor || '#FFFFFF'
  const textColor = customPageTitle?.textColor || '#000000'
  const align = customPageTitle?.align || 'center'
  const fontSize = customPageTitle?.fontSize || 14
  const fontWeight = customPageTitle?.bold ? 'bold' : 'normal'

  const columnWidths = selectedColumns.map(key => {
    const len = (columnLabels[key] || key).length
    return len > 15 ? 2 : 1
  })
  const totalUnits = columnWidths.reduce((a, b) => a + b, 0)

  return (
    <Document>
      <Page size="A4" style={styles.page} orientation={orientation}>
        {/* Tek parça başlık bloğu */}
        <View
          style={{
            ...styles.titleBlock,
            backgroundColor: bgColor,
            color: textColor,
            textAlign: align,
          }}
        >
          <Text style={{
            ...styles.titleText,
            fontSize,
            fontWeight,
            color: textColor,
          }}>
            {titleText.replace(/\n/g, ' \n ')}
          </Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            {selectedColumns.map((col, i) => (
              <Text
                key={i}
                style={[styles.tableHeader, {
                  width: `${(columnWidths[i] / totalUnits) * 100}%`
                }]}
              >
                {columnLabels[col] || col}
              </Text>
            ))}
          </View>

          {data.map((row, rowIndex) => (
            <View key={rowIndex} style={[styles.tableRow, rowIndex % 2 === 1 && styles.zebraRow]}>
              {selectedColumns.map((col, colIndex) => {
                const val = row[col]
                const isDate = typeof val === 'string' && /^\d{4}-\d{2}-\d{2}/.test(val)
                const formatted = isDate ? new Date(val).toLocaleDateString('tr-TR') : val ?? ''
                return (
                  <Text
                    key={colIndex}
                    style={[styles.tableCell, {
                      width: `${(columnWidths[colIndex] / totalUnits) * 100}%`
                    }]}
                  >
                    {formatted}
                  </Text>
                )
              })}
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text>Düzenleyen: {JSON.parse(localStorage.getItem('admin') || '{}')?.name || 'Bilinmeyen Kullanıcı'}</Text>
          <Text>Tarih: {new Date().toLocaleString('tr-TR')}</Text>
          <Text>Toplam Kayıt: {data.length}</Text>
        </View>
      </Page>
    </Document>
  )
}

export default PersonnelReportPDF
