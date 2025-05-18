// ✅ frontend/layouts/AdminLayout.jsx

import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAppStore } from "../store";
import { useEffect } from "react";

export default function AdminLayout() {
  const admin = useAppStore((state) => state.admin);
  const logout = useAppStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin) {
      navigate("/login");
    }
  }, [admin, navigate]);

  if (!admin) return null;

  return (
    <div className="flex min-h-screen">
      {/* Sol Menü */}
      <aside className="w-64 bg-slate-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">TimShift Panel</h2>
        <nav className="space-y-2">
          <a href="/dashboard" className="block">
            Dashboard
          </a>
          <a href="/personnel" className="block">
            Personel
          </a>
          <a href="/definitions" className="block">
            Tanımlar
          </a>
          <a href="/config" className="block">
            Sistem Ayarları
          </a>
        </nav>
      </aside>

      {/* İçerik */}
      <main className="flex-1 p-6 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Hoşgeldin, {admin.name}</h1>
            <p className="text-sm text-gray-600">Rol: {admin.roles?.join(", ")}</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded shadow"
          >
            Çıkış Yap
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  );
}
