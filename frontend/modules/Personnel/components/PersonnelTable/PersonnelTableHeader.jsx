// ✅ frontend/modules/Personnel/components/PersonnelTable/PersonnelTableHeader.jsx
import { Maximize2 } from "lucide-react";
import usePersonnelStore from "@/store/personnel";
import { useEffect, useRef, useState } from "react";
import TableFilter from "./TableFilter";

export default function PersonnelTableHeader({ itemsPerPage, setItemsPerPage }) {
  const { columns, visibleColumns, toggleColumn, setVisibleColumns, data, filters, setFilter } = usePersonnelStore();

  const filterMap = {
    name: ["text", "Ad Soyad"],
    role: ["select", "Görev"],
    yearRange: ["select", "Kıdem (yıl aralığı)"],
  };

  const getUniqueValues = (key) => {
    if (key === "yearRange") {
      return ["0-1 yıl", "1-5 yıl", "5-10 yıl", "10+ yıl"];
    }
    const values = data.map((item) => item[key]);
    return [...new Set(values)].filter(Boolean);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("personnelTable_columns");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setVisibleColumns(parsed);
        }
      } catch {
        console.warn("Kolonlar okunamadı");
      }
    }
  }, [setVisibleColumns]);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleToggle = (colKey) => {
    toggleColumn(colKey);
    const updated = visibleColumns.includes(colKey)
      ? visibleColumns.filter((col) => col !== colKey)
      : [...visibleColumns, colKey];
    localStorage.setItem("personnelTable_columns", JSON.stringify(updated));
  };

  const toggleFullscreen = () => {
    const wrapper = document.getElementById("personnel-table-block");
    if (!document.fullscreenElement && wrapper?.requestFullscreen) {
      wrapper.requestFullscreen();
    } else if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div className="flex justify-between items-center mb-4 gap-4 flex-wrap">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="px-3 py-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
        >
          Kolonlar
        </button>
        {dropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-64 max-h-64 overflow-auto bg-white dark:bg-gray-800 border rounded shadow z-50 p-2">
            {columns.map((col) => (
              <label
                key={col.key}
                className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer text-sm"
              >
                <input
                  type="checkbox"
                  checked={visibleColumns.includes(col.key)}
                  onChange={() => handleToggle(col.key)}
                />
                {col.label}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm whitespace-nowrap">Sayfa başı:</label>
        <select
          className="px-2 py-1 border rounded text-sm bg-white dark:bg-gray-700 dark:text-white"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          {[5, 10, 20, 50, 100, -1].map((n) => (
            <option key={n} value={n}>{n === -1 ? "Tümü" : n}</option>
          ))}
        </select>
      </div>

      <div className="px-2 py-1 flex-wrap items-center space-x-2">
        {Object.entries(filterMap).map(([key, [type, label]]) => (
          <div key={key} className="inline-block">
            <TableFilter
              name={key}
              type={type}
              label={label}
              value={filters[key]}
              onChange={(val) => setFilter(key, val)}
              options={type === "select" ? getUniqueValues(key) : []}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
          title="Tam ekran"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}