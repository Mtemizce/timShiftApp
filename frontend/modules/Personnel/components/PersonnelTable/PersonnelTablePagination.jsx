// ✅ frontend/modules/Personnel/components/PersonnelTable/PersonnelTablePagination.jsx

export default function PersonnelTablePagination({ total, currentPage, setCurrentPage }) {
  const totalPages = Math.ceil(total / 10)

  return (
    <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
      <p>Toplam {total} kayıt</p>
      <div className="space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >Önceki</button>
        <span>{currentPage} / {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >Sonraki</button>
      </div>
    </div>
  )
}
