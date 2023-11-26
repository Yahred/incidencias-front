import { useMutation } from 'react-query';
import { Incidencia } from '../../../interfaces';
import { Evaluacion } from '../../../interfaces/Evaluacion';
import { validarIncidenciaPorId } from '../../../services';
import { useCallback, useState } from 'react';

const useEvaluarTecnico = (incidencia: Incidencia | null) => {
  const [modalCalificarAbierto, setModalCalificarAbierto] =
    useState<boolean>(false);

  const abrirModalCalificar = useCallback(() => {
    setModalCalificarAbierto(true);
  }, []);

  const cerrarModalCalificar = useCallback(() => {
    setModalCalificarAbierto(false);
  }, []);

  const { mutateAsync: validarIncidenciaMut } = useMutation({
    mutationKey: ['evaluar-tecnico'],
    mutationFn: (evaluacion: Evaluacion) =>
      validarIncidenciaPorId(incidencia!.id!, evaluacion),
    onSuccess: () => {
      setModalCalificarAbierto(false);
    },
  });

  return {
    validarIncidenciaMut,
    modalCalificarAbierto,
    abrirModalCalificar,
    cerrarModalCalificar,
  };
};

export default useEvaluarTecnico;
