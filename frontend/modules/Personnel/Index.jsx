import { useEffect, useState, useMemo, useRef } from "react";
import { Users, UserCheck, Truck, ArrowDownAZ, ArrowDownZA } from "lucide-react";
import Topbar from "./components/Topbar";
import Widget from "../../components/Widget";
import PersonnelTableHeader from "./components/PersonnelTable/PersonnelTableHeader";
import PersonnelTableBody from "./components/PersonnelTable/PersonnelTableBody";
import PersonnelTablePagination from "./components/PersonnelTable/PersonnelTablePagination";
import usePersonnelStore from "@/store/personnel";

export default function PersonnelIndex() {
  const [dropdownId, setDropdownId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    fullscreen,
    setFullscreen,
    searchText,
    orderBy,
    orderDirection,
    columns,
    visibleColumns,
    data,
    setOrderBy,
    filters,
    getPersonnels, // zustand fonksiyonu
  } = usePersonnelStore();

  const tableRef = useRef();

  // 🔄 VERİYİ BACKEND'DEN ÇEK
  useEffect(() => {
    getPersonnels();
  }, [getPersonnels]);

  // ⛶ FULLSCREEN DESTEK
  useEffect(() => {
    if (fullscreen && tableRef.current?.requestFullscreen) {
      tableRef.current.requestFullscreen();
    }
  }, [fullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [setFullscreen]);

  // 🔎 FİLTRE VE SIRALAMA
  const filteredData = useMemo(() => {
    let filtered = data.filter((person) => Object.values(person).some((val) => String(val).toLowerCase().includes(searchText.toLowerCase())));

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;
      filtered = filtered.filter((item) => {
        const cell = String(item[key] || "").toLowerCase();
        const search = String(value).toLowerCase();
        return search.length > 0 && cell.includes(search);
      });
    });

    if (!orderBy) return filtered;
    return filtered.sort((a, b) => {
      const valA = String(a[orderBy] || "");
      const valB = String(b[orderBy] || "");
      return orderDirection === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }, [searchText, orderBy, orderDirection, data, filters]);

  return (
    <div className="space-y-6">
      <Topbar />

      {/* 📊 WIDGET’LAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Widget title="Toplam Personel" value={data.length} icon={<Users />} color="bg-blue-600" />
        <Widget title="Aktif Personel" value={data.filter((p) => p.status === "active").length} icon={<UserCheck />} color="bg-green-600" />
        <Widget title="Şoför Sayısı" value={data.filter((p) => p.role?.toLowerCase() === "şoför").length} icon={<Truck />} color="bg-yellow-600" />
      </div>

      {/* ✅ Wrapper + Header birlikte fullscreen yapılacak blok */}
      <div id="personnel-table-block" ref={tableRef} className="bg-white dark:bg-gray-800 rounded shadow p-4">
        <PersonnelTableHeader />

        <div id="table-wrapper" className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                <th className="p-2">#</th>
                {columns.map(
                  ({ key, label }) =>
                    visibleColumns.includes(key) && (
                      <th key={key} onClick={() => setOrderBy(key)} className="p-2 capitalize cursor-pointer hover:underline">
                        {label}
                        {orderBy === key && (orderDirection === "asc" ? <ArrowDownAZ className="w-3 h-3 inline ml-1" /> : <ArrowDownZA className="w-3 h-3 inline ml-1" />)}
                      </th>
                    )
                )}
                <th className="p-2 text-right">İşlemler</th>
              </tr>
            </thead>
            <PersonnelTableBody data={filteredData} dropdownId={dropdownId} setDropdownId={setDropdownId} />
          </table>
        </div>

        <PersonnelTablePagination total={filteredData.length} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
}
