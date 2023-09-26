import { lazy } from 'react';

import { Outlet } from 'react-router-dom';

import Catalogo from './';
import Categorias from './pages/Categorias/Catalogo';
import CategoriaFormulario from './pages/Categorias/Formulario';
import ModeloFormulario from './pages/Modelos/Formulario';

const Usuarios = lazy(() => import('./pages/Usuarios/Catalogo'));
const Recursos = lazy(() => import('./pages/Recursos'));
const Modelos = lazy(() => import('./pages/Modelos/Catalogo'));
const Edificios = lazy(() => import('./pages/Edificios/Catalogo'));
const Salones = lazy(() => import('./pages/Salones/Catalogo'));
const Areas = lazy(() => import('./pages/Areas/Catalogo'));

const EdificioFormulario = lazy(() => import('./pages/Edificios/Formulario'));
const UsuarioFormulario = lazy(() => import('./pages/Usuarios/Formulario'));
const SalonFormulario = lazy(() => import('./pages/Salones/Formulario'));
const AreaFormulario = lazy(() => import('./pages/Areas/Formulario'));

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
        {
          path: ':id',
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
      Component: Outlet,
      children: [
        {
          path: '',
          Component: Modelos,
        },
        {
          path: 'formulario',
          Component: ModeloFormulario,
        },
        {
          path: ':id',
          Component: ModeloFormulario,
        },
      ],
    },
    {
      path: 'edificios',
      Component: Outlet,
      children: [
        {
          path: '',
          Component: Edificios,
        },
        {
          path: 'formulario',
          Component: EdificioFormulario,
        },
        {
          path: ':id',
          Component: EdificioFormulario,
        },
      ],
    },
    {
      path: 'salones',
      Component: Outlet,
      children: [
        {
          path: '',
          Component: Salones,
        },
        {
          path: 'formulario',
          Component: SalonFormulario,
        },
        {
          path: ':id',
          Component: SalonFormulario,
        },
      ],
    },
    {
      path: 'areas',
      Component: Outlet,
      children: [
        {
          path: '',
          Component: Areas,
        },
        {
          path: 'formulario',
          Component: AreaFormulario,
        },
        {
          path: ':id',
          Component: AreaFormulario,
        },
      ],
    },
    {
      path: 'categorias',
      Component: Outlet,
      children: [
        {
          path: '',
          Component: Categorias,
        },
        {
          path: 'formulario',
          Component: CategoriaFormulario,
        },
        {
          path: ':id',
          Component: CategoriaFormulario,
        },
      ],
    },
  ],
};

export default router;
