import { createBrowserRouter } from 'react-router-dom';

import Login from '../modules/Login';
import App from '../App';
import Dashboard from '../modules/Dashboard';
import Catalogos from '../modules/Catalogos';
import Usuarios from '../modules/Catalogos/pages/Usuarios';

const router = createBrowserRouter([
  {
    path: '',
    Component: App,
    children: [
      {
        path: '',
        Component: Dashboard,
      },
      {
        path: '/catalogos',
        Component: Catalogos,
        children: [
          {
            path: '',
            Component: Usuarios,
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    Component: Login,
  },
]);

export default router;
