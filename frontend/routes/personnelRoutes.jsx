// ✅ frontend/routes/personnelRoutes.jsx

import PersonnelIndex from '../modules/Personnel/Index'
import AddPersonnel from '../modules/Personnel/pages/addPersonnel'

const PersonnelRoutes = [
  {
    path: 'personnel',
    element: <PersonnelIndex />
  },
  {
    path: 'personnel/add',
    element: <AddPersonnel />
  }
]

export default PersonnelRoutes
