// ✅ frontend/routes/personnelRoutes.jsx

import PersonnelIndex from '../modules/Personnel/Index'
import AddPersonnel from '../modules/Personnel/pages/addPersonnel'
import AddMultiplePersonnel from '../modules/Personnel/pages/addMultiplePersonnel'

const PersonnelRoutes = [
  {
    path: 'personnel',
    element: <PersonnelIndex />
  },
  {
    path: 'personnel/add',
    element: <AddPersonnel />
  },
  {
    path: 'personnel/add-multiple',
    element: <AddMultiplePersonnel />
  }
]

export default PersonnelRoutes
