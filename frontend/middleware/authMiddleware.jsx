// ✅ frontend/middleware/authMiddleware.jsx

import { Navigate, Outlet } from 'react-router-dom'
import { useAppStore } from '../store'

export function ProtectedRoute() {
  const admin = useAppStore((state) => state.admin)
  return admin ? <Outlet /> : <Navigate to="/login" replace />
}
