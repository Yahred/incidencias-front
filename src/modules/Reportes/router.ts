import { lazy } from "react";

const Reportes = lazy(() => import('./'));

const ElementosConfiguracion = lazy(() => import('./pages/ElementosConfiguracion'));

const router = {
  path: 'reportes',
  Component: Reportes,
  children: [
    {
      path: 'configuraciones',
      Component: ElementosConfiguracion
    }
  ]
}

export default router;
