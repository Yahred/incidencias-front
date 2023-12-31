import { useCallback, useState } from 'react';

import { Incidencia } from '@interfaces/Incidencia';

const useModalIncidencia = () => {
  const [modalAbierto, setModalAbierto] = useState<boolean>(false);
  const [incidenciaSeleccionada, setIncidenciaSeleccionada] = useState<Incidencia | null>(null);

  const abrirModal = useCallback((incidencia: Incidencia) => {
    setIncidenciaSeleccionada(incidencia);
    setModalAbierto(true);
  }, []);

  const cerrarModal = useCallback(() => {
    setIncidenciaSeleccionada(null);
    setModalAbierto(false);
  }, []);

  return {
    modalAbierto,
    abrirModal,
    cerrarModal,
    incidenciaSeleccionada,
    setIncidenciaSeleccionada,
  };
};

export default useModalIncidencia;
