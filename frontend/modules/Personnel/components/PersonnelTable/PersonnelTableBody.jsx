// ✅ frontend/modules/Personnel/components/PersonnelTableBody.jsx (revize: giriş tarihi + kıdem + telefon formatlama)
import { useEffect, useRef, useState } from "react";
import usePersonnelStore from "@/store/personnel";

export default function PersonnelTableBody({ data }) {
  const { visibleColumns, columns } = usePersonnelStore();
  const [contextMenu, setContextMenu] = useState(null);

  useEffect(() => {
    const close = () => setContextMenu(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const handleAction = (action) => {
    if (!contextMenu?.person) return;

    if (action === "Güncelle") {
      navigate(`/personnel/edit/${contextMenu.person.id}`);
    } else {
      console.log(`İşlem: ${action}, Personel ID: ${contextMenu.person.id}`);
    }

    setContextMenu(null);
  };

  const formatDate = (value) => {
    if (!value || typeof value !== "string" || !value.includes("-")) return value;
    const [year, month, day] = value.split("-");
    return `${day}.${month}.${year}`;
  };

  const formatDateWithSeniority = (value) => {
    if (!value || typeof value !== "string" || !value.includes("-")) return value;
    const [year, month, day] = value.split("-");
    const formatted = `${day}.${month}.${year}`;
    const now = new Date();
    const startDate = new Date(value);
    const years = Math.floor((now - startDate) / (1000 * 60 * 60 * 24 * 365.25));
    return `${formatted} (${years} yıl)`;
  };

  const formatPhoneNumber = (value) => {
    if (!value) return "";
    const cleaned = value.replace(/\D/g, "");
    const padded = cleaned.padStart(10, "0");
    return padded.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "0$1 $2 $3 $4");
  };

  return (
    <tbody>
      {data.map((person, index) => (
        <tr
          key={person.id}
          onContextMenu={(e) => {
            e.preventDefault();
            setContextMenu({ x: e.pageX, y: e.pageY, person });
          }}
          className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <td className="p-2 text-sm">{index + 1}</td>
          {columns.map(
            ({ key }) =>
              visibleColumns.includes(key) && (
                <td key={key} className="p-2 text-sm">
                  {key === "start_date"
                    ? formatDateWithSeniority(person[key])
                    : ["birth_date", "end_date"].includes(key)
                    ? formatDate(person[key])
                    : key === "phone"
                    ? formatPhoneNumber(person[key])
                    : String(person[key] ?? "")}
                </td>
              )
          )}
        </tr>
      ))}

      {contextMenu && (
        <tr className="fixed top-0 left-0">
          <td colSpan={visibleColumns.length + 2}>
            <div
              style={{ top: contextMenu.y, left: contextMenu.x }}
              className="fixed z-50 bg-white dark:bg-gray-800 border rounded shadow text-sm"
            >
              <button
                onClick={() => handleAction("Güncelle")}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
              >
                Güncelle
              </button>
              <button
                onClick={() => handleAction("İşten Çıkış")}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
              >
                İşten Çıkış
              </button>
              <button
                onClick={() => handleAction("İzin Ver")}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
              >
                İzin Ver
              </button>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );
}
