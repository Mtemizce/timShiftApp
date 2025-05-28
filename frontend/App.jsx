import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppStore } from './store'

import Login from './modules/Auth/pages/Login'
import Dashboard from './modules/Dashboard/Dashboard'
import AdminLayout from './layouts/AdminLayout'
import PersonnelIndex from './modules/Personnel/Index'
import AddPersonnel from './modules/Personnel/pages/addPersonnel'
import AddMultiplePersonnel from './modules/Personnel/pages/addMultiplePersonnel'
import Definitions from './modules/Definitions/Index'
import PersonnelReports from './modules/Reports/pages/Index'
import EditPersonnel from './modules/Personnel/pages/editPersonnel'
import Settings from './modules/Settings/SettingsPage'


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
          <Route path="personnel/add-multiple" element={<AddMultiplePersonnel />} />
          <Route path="personnel/edit/:id" element={<EditPersonnel />} />
          <Route path="definitions" element={<Definitions />} />
          <Route path="reports/personnel" element={<PersonnelReports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  )
}
