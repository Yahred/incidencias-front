import { useCallback, useState } from 'react';

import { Incidencia } from '@interfaces/Incidencia';
import { useMutation } from 'react-query';
import { aprobarIncidenciaPorId } from '@services';

const useManejarIncidencia = () => {
  const [modalAbierto, setModalAbierto] = useState<boolean>(false);
  const [incidenciaSeleccionada, setIncidenciaSeleccionada] = useState<Incidencia | null>(null);

  const { mutateAsync: aprobarMutate } = useMutation({
    mutationKey: ['incidencia', 'aprobar'],
    mutationFn: aprobarIncidenciaPorId,
  })

  const abrirModal = useCallback((incidencia: Incidencia) => {
    setIncidenciaSeleccionada(incidencia);
    setModalAbierto(true);
  }, []);

  const cerrarModal = useCallback(() => {
    setIncidenciaSeleccionada(null);
    setModalAbierto(false);
  }, []);

  const aprobarIncidencia = useCallback(async (id: string) => {
    await aprobarMutate(id);
  }, [aprobarMutate]);

  return {
    modalAbierto,
    abrirModal,
    cerrarModal,
    incidenciaSeleccionada,
    aprobarIncidencia,
  };
};

export default useManejarIncidencia;
