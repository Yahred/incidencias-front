import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import CatalogosRouter from '../modules/Catalogos/router';

import Login from '../modules/Login';
import App from '../App';
import Dashboard from '../modules/Dashboard';
import Catalogos from '../modules/Catalogos';
import Usuarios from '../modules/Catalogos/pages/Usuarios/Catalogo';

const Tablero = lazy(() => import('../modules/Tablero'));

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
        ...CatalogosRouter,
      },
      {
        path: '/tablero',
        Component: Tablero,
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
  {
    path: '',
    handle: ''
  }
]);

export default router;
