import Reportes from './';
import ElementosConfiguracion from './pages/ElementosConfiguracion';

const router = {
  path: 'reportes',
  Component: Reportes,
  children: [
    {
      path: 'configuraciones',
      Component: ElementosConfiguracion,
    },
    {
      path: '',
    }
  ],
};

export default router;
