// ✅ frontend/modules/Personnel/components/PersonnelTable/PersonnelTableHeader.jsx (revize: sadece belirli sütunlara filtre uygulanacak şekilde güncellendi)
import { Maximize2 } from "lucide-react";
import usePersonnelStore from "@/store/personnel";
import { useEffect, useRef, useState } from "react";
import TableFilter from "./TableFilter";

export default function PersonnelTableHeader() {
  const { columns, visibleColumns, toggleColumn, setVisibleColumns, data, filters, setFilter } = usePersonnelStore();

  const filterMap = {
    name: "text",
    role: "select",
  };

  const getUniqueValues = (key) => {
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
    const updated = visibleColumns.includes(colKey) ? visibleColumns.filter((col) => col !== colKey) : [...visibleColumns, colKey];
    localStorage.setItem("personnelTable_columns", JSON.stringify(updated));
  };

  const toggleFullscreen = () => {
    const wrapper = document.getElementById("personnel-table-block")
    if (!document.fullscreenElement && wrapper?.requestFullscreen) {
      wrapper.requestFullscreen();
    } else if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="relative" ref={dropdownRef}>
        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="px-3 py-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">
          Kolonlar
        </button>
        {dropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-64 max-h-64 overflow-auto bg-white dark:bg-gray-800 border rounded shadow z-50 p-2">
            {columns.map((col) => (
              <label key={col.key} className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer text-sm">
                <input type="checkbox" checked={visibleColumns.includes(col.key)} onChange={() => handleToggle(col.key)} />
                {col.label}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="px-2 py-1 flex-wrap items-center space-x-2">
        {Object.entries(filterMap).map(([key, type]) => (
          <div key={key} className="inline-block">
            <TableFilter name={key} type={type} value={filters[key]} onChange={(val) => setFilter(key, val)} options={type === "select" ? getUniqueValues(key) : []} />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button onClick={toggleFullscreen} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer" title="Tam ekran">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
