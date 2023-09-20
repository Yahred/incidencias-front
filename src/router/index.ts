import { createBrowserRouter } from 'react-router-dom';

import Login from '../modules/Login';
import App from '../App';
import Dashboard from '../modules/Dashboard';
import Catalogos from '../modules/Catalogos';
import Usuarios from '../modules/Catalogos/pages/Usuarios';
import Modelos from '../modules/Catalogos/pages/Modelos';
import Recursos from '../modules/Catalogos/pages/Recursos';

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
        path: 'catalogos',
        Component: Catalogos,
        children: [
          {
            path: '',
            Component: Usuarios,
          },
          {
            path: 'recursos',
            Component: Recursos,
          },
          {
            path: 'modelos',
            Component: Modelos,
          },
        ],
      },
      {
        path: '/tablero',
        Component: Catalogos,
        children: [
          {
            path: '',
            Component: Usuarios,
          },
        ],
      },
      {
        path: '/incidencias',
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
