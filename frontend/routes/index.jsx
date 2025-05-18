import { Navigate } from 'react-router-dom'
import { ProtectedRoute } from '../middleware/authMiddleware'

import DashboardRoutes from './dashboardRoutes'
import PersonnelRoutes from './personnelRoutes' 
import Login from '../modules/Auth/Login' // 

export const appRoutes = [
  {
    path: '/login',
    element: <Login /> // ✅ DÜZELTİLDİ
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      ...DashboardRoutes,
      ...PersonnelRoutes // 
    ]
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />
  }
]
