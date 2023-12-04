import { useMutation, useQuery } from 'react-query';

import { aprobarCambio, obtenerCambioPorId, solicitarCambio } from '@services';
import { useCallback, useState } from 'react';

const useCambioRecurso = (cambioId?: string) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>();

  const { mutateAsync: solicitarCambioMut } = useMutation({
    mutationFn: solicitarCambio,
    mutationKey: 'solicitar-cambio',
  });

  const { mutateAsync: aprobarCambioMut } = useMutation({
    mutationFn: aprobarCambio,
    mutationKey: 'aprobar-cambio'
  })

  const { data: cambio } = useQuery({
    queryFn: () => obtenerCambioPorId(cambioId!),
    enabled: !!cambioId,
    queryKey: ['cambio', cambioId],
    initialData: null,
  });

  const abrirDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const cerrarDrawer = useCallback(() => {
    setIsDrawerOpen(false)
  }, []);

  return {
    solicitarCambio: solicitarCambioMut,
    isDrawerOpen,
    abrirDrawer,
    cerrarDrawer,
    cambio,
    aprobarCambio: aprobarCambioMut
  };
};

export default useCambioRecurso;
