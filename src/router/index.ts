import { createHashRouter } from 'react-router-dom';

import CatalogosRouter from '../modules/Catalogos/router';
import ReportesRouter from '../modules/Reportes/router';

import Login from '../modules/Login';
import App from '../App';
import Tablero from '../modules/Tablero';
import MiTrabajo from '../modules/MiTrabajo';
import NotFound from '../modules/NotFound';
import Incidencias from '../modules/Incidencias';

const router = createHashRouter([
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
        ...ReportesRouter,
      },
      {
        path: '/tablero',
        Component: Tablero,
      },
      {
        path: '/incidencias',
        Component: Incidencias,
      },
    ],
  },
  {
    path: 'login',
    Component: Login,
  },
  {
    path: '*',
    Component: NotFound,
  }
]);

export default router;
