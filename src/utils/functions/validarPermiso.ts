import { APPBAR_MENU_ITEMS } from '@constants/menu';

const validarPermiso = (path: string, modulos?: string[]) => {
  if (!modulos) return true;

  const modulo = APPBAR_MENU_ITEMS.find(
    ({ ruta }) => ruta !== '/' && path.includes(ruta)
  );

  if (!modulo) return true;
  return modulos.includes(modulo.clave);
};

export default validarPermiso;
