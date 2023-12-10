import { useMutation, useQuery } from 'react-query';

import {
  aprobarCambio,
  obtenerCambioPorId,
  rechazarCambio,
  solicitarCambio,
} from '@services';
import { useCallback, useState } from 'react';

const useCambioRecurso = (cambioId?: string) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>();

  const { mutateAsync: solicitarCambioMut } = useMutation({
    mutationFn: solicitarCambio,
    mutationKey: 'solicitar-cambio',
  });

  const { mutateAsync: aprobarCambioMut } = useMutation({
    mutationFn: aprobarCambio,
    mutationKey: 'aprobar-cambio',
  });

  const { mutateAsync: rechazarCambioMut } = useMutation({
    mutationFn: rechazarCambio,
    mutationKey: 'rechazar-cambio',
  });

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
    setIsDrawerOpen(false);
  }, []);

  return {
    isDrawerOpen,
    abrirDrawer,
    cerrarDrawer,
    cambio,
    solicitarCambio: solicitarCambioMut,
    aprobarCambio: aprobarCambioMut,
    rechazarCambio: rechazarCambioMut,
  };
};

export default useCambioRecurso;
