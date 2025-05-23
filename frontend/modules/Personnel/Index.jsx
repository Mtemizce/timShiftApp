// ✅ frontend/modules/Personnel/Index.jsx (revize: filters state ile filtreleme destekli)
import { useEffect, useState, useMemo, useRef } from "react";
import { Users, UserCheck, Truck, ArrowDownAZ, ArrowDownZA } from "lucide-react";
import Topbar from "./components/Topbar";
import Widget from "../../components/Widget";
import PersonnelTableHeader from "./components/PersonnelTable/PersonnelTableHeader";
import PersonnelTableBody from "./components/PersonnelTable/PersonnelTableBody";
import PersonnelTablePagination from "./components/PersonnelTable/PersonnelTablePagination";
import usePersonnelStore from "@/store/personnel";

const MOCK_DATA = [
  { id: 1, name: "Ali Veli", phone: "0555 111 22 33", department: "Ulaşım", role: "Şoför" },
  { id: 2, name: "Ayşe Kaya", phone: "0555 444 55 66", department: "Temizlik", role: "Mıntıka" },
  { id: 3, name: "Mehmet Can", phone: "0555 777 88 99", department: "Zabıta", role: "Zabıta" },
  { id: 4, name: "Zehra Yıldız", phone: "0555 000 11 22", department: "Ulaşım", role: "Şoför" },
  { id: 5, name: "Osman Koç", phone: "0555 333 44 55", department: "İdari", role: "Memur" },
];

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
    setData,
    setOrderBy,
    filters,
  } = usePersonnelStore();

  const tableRef = useRef();

  useEffect(() => {
    setData(MOCK_DATA);
  }, []);

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

  const filteredData = useMemo(() => {
    let filtered = data.filter((person) =>
      Object.values(person).some((val) =>
        String(val).toLowerCase().includes(searchText.toLowerCase())
      )
    );

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((item) => String(item[key]) === value);
      }
    });

    if (!orderBy) return filtered;
    return filtered.sort((a, b) => {
      const valA = String(a[orderBy] || "");
      const valB = String(b[orderBy] || "");
      return orderDirection === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
  }, [searchText, orderBy, orderDirection, data, filters]);

  return (
    <div className="space-y-6">
      <Topbar />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Widget title="Toplam Personel" value={data.length} icon={<Users />} color="bg-blue-600" />
        <Widget title="Aktif Personel" value={data.length - 1} icon={<UserCheck />} color="bg-green-600" />
        <Widget title="Şoför Sayısı" value={2} icon={<Truck />} color="bg-yellow-600" />
      </div>

      <div id="table-wrapper" ref={tableRef} className="bg-white dark:bg-gray-800 rounded shadow p-4 overflow-x-auto">
        <PersonnelTableHeader />
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
              <th className="p-2">#</th>
              {columns.map(
                ({ key, label }) =>
                  visibleColumns.includes(key) && (
                    <th
                      key={key}
                      onClick={() => setOrderBy(key)}
                      className="p-2 capitalize cursor-pointer hover:underline"
                    >
                      {label}
                      {orderBy === key &&
                        (orderDirection === "asc" ? (
                          <ArrowDownAZ className="w-3 h-3 inline ml-1" />
                        ) : (
                          <ArrowDownZA className="w-3 h-3 inline ml-1" />
                        ))}
                    </th>
                  )
              )}
              <th className="p-2 text-right">İşlemler</th>
            </tr>
          </thead>
          <PersonnelTableBody
            data={filteredData}
            dropdownId={dropdownId}
            setDropdownId={setDropdownId}
          />
        </table>

        <PersonnelTablePagination
          total={filteredData.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
