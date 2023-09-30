import { createBrowserRouter } from 'react-router-dom';

import CatalogosRouter from '../modules/Catalogos/router';

import Login from '../modules/Login';
import App from '../App';
import Catalogos from '../modules/Catalogos';
import Usuarios from '../modules/Catalogos/pages/Usuarios/Catalogo';
import Tablero from '../modules/Tablero';
import MiTrabajo from '../modules/MiTrabajo';

const router = createBrowserRouter([
  {
    path: '',
    Component: App,
    children: [
      {
        path: '',
        Component: MiTrabajo,
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
]);

export default router;
