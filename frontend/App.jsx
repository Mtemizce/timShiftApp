// ✅ frontend/App.jsx

import { useRoutes } from 'react-router-dom'
import { appRoutes } from './routes'

export default function App() {
  return useRoutes(appRoutes)
}