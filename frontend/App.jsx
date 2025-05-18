import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppStore } from './store'

import Login from './modules/Auth/Login'
import Dashboard from './modules/Dashboard/Dashboard'
import AdminLayout from './layouts/AdminLayout'
import PersonnelIndex from './modules/Personnel/Index'
import AddPersonnel from './modules/Personnel/pages/addPersonnel'

export default function App() {
  const admin = useAppStore((state) => state.admin)

  return (
    <Routes>
      <Route
        path="/login"
        element={admin ? <Navigate to="/dashboard" replace /> : <Login />}
      />

      {admin ? (
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="personnel" element={<PersonnelIndex />} />
          <Route path="personnel/add" element={<AddPersonnel />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  )
}
