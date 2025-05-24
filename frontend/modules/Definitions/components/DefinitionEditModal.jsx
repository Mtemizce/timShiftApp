import { useState, useEffect, useRef } from "react";
import { updateDefinition } from "../services/definitionsService";
import { notify } from "@/utils/notify";

export default function DefinitionEditModal({ open, onClose, data, onSuccess }) {
  const [key, setKey] = useState(data?.key || "");
  const modalRef = useRef(null);

  useEffect(() => {
    if (data) setKey(data.key);
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDefinition(data.id, { key });
      notify("Güncellendi", "Tanım başarıyla güncellendi", { toastr: true });
      onSuccess();
      onClose();
    } catch (err) {
      notify("Hata", err.message, { toastr: true, icon: "error" });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-900 p-6 rounded-md shadow-md w-full max-w-md"
      >
        <h3 className="text-lg font-semibold mb-4">Tanım Düzenle</h3>
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="input w-full"
            placeholder="Tanım adı"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
