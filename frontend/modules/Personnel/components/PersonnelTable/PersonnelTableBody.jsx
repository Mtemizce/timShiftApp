// ✅ PersonnelTableBody.jsx (sadece güncelle yönlendirmesi için düzenlendi)
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePersonnelStore from "@/store/personnel";

export default function PersonnelTableBody({ data }) {
  const { visibleColumns, columns } = usePersonnelStore();
  const [contextMenu, setContextMenu] = useState(null);
  const navigate = useNavigate();

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
                  {key === "image_file" ? (
                    person[key] ? (
                      <>
                        <input type="checkbox" id={person.id} className="hidden peer" />
                        <label htmlFor={person.id} className="cursor-pointer inline-block">
                          <img
                            src={`/api/personnel/photo/${person.tc_no}/${person[key]}`}
                            alt="Profil"
                            className="w-14 h-14 object-cover rounded "
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/40"; // Placeholder image
                            }}
                          />
                        </label>
                        <div
                          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center
            opacity-0 pointer-events-none transition-opacity peer-checked:opacity-100 peer-checked:pointer-events-auto"
                        >
                          <label htmlFor={person.id} className="absolute inset-0 cursor-pointer"></label>
                          <div className="relative z-10 max-w-3xl max-h-[90vh] p-4">
                            <label htmlFor={person.id} className="absolute top-2 right-2 text-white text-3xl font-bold cursor-pointer">
                              &times;
                            </label>
                            <img
                              src={`/api/personnel/photo/${person.tc_no}/${person[key]}`}
                              alt="Profil"
                              className="w-full h-auto object-cover rounded "
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/40"; // Placeholder image
                              }}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <span className="text-gray-400 italic">Yok</span>
                    )
                  ) : key === "start_date" ? (
                    formatDateWithSeniority(person[key])
                  ) : ["birth_date", "end_date"].includes(key) ? (
                    formatDate(person[key])
                  ) : key === "phone" ? (
                    formatPhoneNumber(person[key])
                  ) : (
                    String(person[key] ?? "")
                  )}
                </td>
              )
          )}
        </tr>
      ))}

      {contextMenu && (
        <tr className="fixed top-0 left-0">
          <td colSpan={visibleColumns.length + 2}>
            <div style={{ top: contextMenu.y, left: contextMenu.x }} className="fixed z-50 bg-white dark:bg-gray-800 border rounded shadow text-sm">
              <button onClick={() => handleAction("Güncelle")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                Güncelle
              </button>
              <button onClick={() => handleAction("İşten Çıkış")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                İşten Çıkış
              </button>
              <button onClick={() => handleAction("İzin Ver")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                İzin Ver
              </button>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );
}
