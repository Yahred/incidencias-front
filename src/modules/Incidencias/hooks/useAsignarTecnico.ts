import { useCallback, useState } from 'react';

const useAsignarTecnico = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const abrirDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const cerrarDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return {
    isDrawerOpen,
    abrirDrawer,
    cerrarDrawer,
  };
};

export default useAsignarTecnico;
