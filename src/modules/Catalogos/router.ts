import { lazy } from 'react';

import Catalogo from './';
import { Outlet } from 'react-router-dom';

const Usuarios = lazy(() => import('./pages/Usuarios'));
const Recursos = lazy(() => import('./pages/Recursos'));
const Modelos = lazy(() => import('./pages/Modelos'));

const UsuarioFormulario = lazy(() => import('./pages/UsuarioFormulario'));

const router = {
  path: 'catalogos',
  Component: Catalogo,
  children: [
    {
      path: '',
      Component: Outlet,
      children: [
        {
          path: '',
          Component: Usuarios,
        },
        {
          path: 'formulario',
          Component: UsuarioFormulario,
        },
      ],
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
};

export default router;
