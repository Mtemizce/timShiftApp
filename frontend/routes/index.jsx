// ✅ frontend/routes/index.jsx (revize edilmiş - tam hali)
import { Navigate } from 'react-router-dom'
import { ProtectedRoute } from '../middleware/authMiddleware'
import AdminLayout from '../layouts/AdminLayout'
import { useAppStore } from '../store'

import DashboardRoutes from './dashboardRoutes'
import PersonnelRoutes from './personnelRoutes'
import Login from '../modules/Auth/Login'

const LoginRoute = () => {
  const admin = useAppStore((state) => state.admin)
  return admin ? <Navigate to="/dashboard" replace /> : <Login />
}

export const appRoutes = [
  {
    path: '/login',
    element: <LoginRoute />
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" />
      },
      ...DashboardRoutes,
      ...PersonnelRoutes
    ]
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />
  }
] // 👈 bu yapı tüm yönlendirme ve layout sorunlarını çözer
