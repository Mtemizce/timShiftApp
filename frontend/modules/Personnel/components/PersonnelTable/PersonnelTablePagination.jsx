// frontend/modules/Personnel/components/PersonnelTable/PersonnelTablePagination.jsx
export default function PersonnelTablePagination({ total, currentPage, setCurrentPage, itemsPerPage }) {
  if (itemsPerPage === -1 || total <= itemsPerPage) return null;

  const totalPages = Math.ceil(total / itemsPerPage);
  if (totalPages <= 1) return null;

  const range = 3;
  const pages = [];
  const start = Math.max(currentPage - range, 1);
  const end = Math.min(currentPage + range, totalPages);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-between items-center mt-4 text-sm">
      <div className="text-gray-600 dark:text-gray-300">
        Sayfa {currentPage} / {totalPages} – Toplam {total} kayıt
      </div>
      <div className="flex gap-1">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-2 py-1 rounded border bg-white dark:bg-gray-700 dark:text-white"
          >
            Önceki
          </button>
        )}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded border cursor-pointer hover:bg-gray-500 hover:text-white ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700 dark:text-white"
            }`}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-2 py-1 rounded border bg-white dark:bg-gray-700 dark:text-white cursor-pointer hover:bg-gray-500 hover:text-white"
          >
            Sonraki
          </button>
        )}
      </div>
    </div>
  );
}
