// frontend/modules/Personnel/Index.jsx
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
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
    getPersonnels,
  } = usePersonnelStore();

  const tableRef = useRef();

  useEffect(() => {
    getPersonnels();
  }, [getPersonnels]);

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
      if (!value) return;

      if (key === "yearRange") {
        const now = new Date();
        filtered = filtered.filter((item) => {
          const date = new Date(item.start_date);
          const years = (now - date) / (1000 * 60 * 60 * 24 * 365.25);

          switch (value) {
            case "0-1 yıl": return years >= 0 && years < 1;
            case "1-5 yıl": return years >= 1 && years < 5;
            case "5-10 yıl": return years >= 5 && years < 10;
            case "10+ yıl": return years >= 10;
            default: return true;
          }
        });
      } else {
        filtered = filtered.filter((item) => {
          const cell = String(item[key] || "").toLowerCase();
          const search = String(value).toLowerCase();
          return search.length > 0 && cell.includes(search);
        });
      }
    });

    if (!orderBy) return filtered;
    return filtered.sort((a, b) => {
      const valA = String(a[orderBy] || "");
      const valB = String(b[orderBy] || "");
      return orderDirection === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }, [searchText, orderBy, orderDirection, data, filters]);

  const paginatedData = useMemo(() => {
    if (itemsPerPage === -1) return filteredData;
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage, itemsPerPage]);

  useEffect(() => {
    const tableWrapper = document.getElementById("table-wrapper");
    if (tableWrapper) tableWrapper.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1); // Sayfa başı değiştirilince sayfa sıfırlanmalı
  }, [itemsPerPage]);

  return (
    <div className="space-y-6">
      <Topbar />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Widget title="Toplam Personel" value={data.length} icon={<Users />} color="bg-blue-600" />
        <Widget title="Araç Arkası" value={data.filter((p) =>p.role?.toLocaleLowerCase("tr") === 'araç arkası').length} icon={<UserCheck />} color="bg-green-600" />
        <Widget title="Şoför Sayısı" value={data.filter((p) => p.role?.toLocaleLowerCase("tr") === "şoför").length} icon={<Truck />} color="bg-yellow-600" />
      </div>

      <div id="personnel-table-block" ref={tableRef} className="bg-white dark:bg-gray-800 rounded shadow p-4 ">
        <PersonnelTableHeader itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />

        <div id="table-wrapper" className="overflow-visible">
          <table className="w-full text-sm ">
            <thead>
              <tr className="sticky -top-6 z-10 bg-gray-100 dark:bg-gray-700 text-left  text-gray-800 dark:text-gray-100">
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
              </tr>
            </thead>
            <PersonnelTableBody data={paginatedData} dropdownId={dropdownId} setDropdownId={setDropdownId} />
          </table>
        </div>

        <PersonnelTablePagination
          total={itemsPerPage === -1 ? filteredData.length : filteredData.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
}