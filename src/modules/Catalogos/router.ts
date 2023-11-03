import { lazy } from 'react';

import { Outlet } from 'react-router-dom';

import Catalogo from './';

const Usuarios = lazy(() => import('./pages/Usuarios/Catalogo'));
const Recursos = lazy(() => import('./pages/Recursos/Catalogo'));
const Modelos = lazy(() => import('./pages/Modelos/Catalogo'));
const Edificios = lazy(() => import('./pages/Edificios/Catalogo'));
const Salones = lazy(() => import('./pages/Salones/Catalogo'));
const Areas = lazy(() => import('./pages/Areas/Catalogo'));
const Categorias = lazy(() => import('./pages/Categorias/Catalogo'));
const Departamentos = lazy(() => import('./pages/Departamentos/Catalogo'));
const Servicios = lazy(() => import('./pages/Servicios/Catalogo'));

const AreaFormulario = lazy(() => import('./pages/Areas/Formulario'));
const EdificioFormulario = lazy(() => import('./pages/Edificios/Formulario'));
const UsuarioFormulario = lazy(() => import('./pages/Usuarios/Formulario'));
const SalonFormulario = lazy(() => import('./pages/Salones/Formulario'));
const RecursoFormulario = lazy(() => import('./pages/Recursos/Formulario'));
const ModeloFormulario = lazy(() => import('./pages/Modelos/Formulario'));
const CategoriaFormulario = lazy(() => import('./pages/Categorias/Formulario'));
const DepartamentoFormulario = lazy(() => import('./pages/Departamentos/Formulario'));
const ServicioFormulario = lazy(() => import('./pages/Servicios/Formulario'));

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
      Component: Outlet,
      children: [
        {
          path: '',
          Component: Recursos,
        },
        {
          path: 'formulario',
          Component: RecursoFormulario
        },
        {
          path: ':id',
          Component: RecursoFormulario,
        },
      ],
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
    {
      path: 'departamentos',
      Component: Outlet,
      children: [
        {
          path: '',
          Component: Departamentos,
        },
        {
          path: 'formulario',
          Component: DepartamentoFormulario,
        },
        {
          path: ':id',
          Component: DepartamentoFormulario,
        },
      ]
    },
    {
      path: 'servicios',
      Component: Outlet,
      children: [
        {
          path: '',
          Component: Servicios,
        },
        {
          path: 'formulario',
          Component: ServicioFormulario,
        },
        {
          path: ':id',
          Component: ServicioFormulario,
        },
      ]
    }
  ],
};

export default router;
