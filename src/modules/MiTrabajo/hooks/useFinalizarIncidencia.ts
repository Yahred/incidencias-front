import { useMutation } from 'react-query';

import { finalizarIncidenciaPorId } from '@services';
import { Incidencia } from '../../../interfaces';

const useFinalizarIncidencia = (incidencia: Incidencia | null) => {
  const { mutateAsync: finalizarIncidenciaMut } = useMutation({
    mutationKey: ['finalizar', incidencia?.id],
    mutationFn: () => finalizarIncidenciaPorId(incidencia!.id!),
  });

  return { finalizarIncidenciaMut };
};

export default useFinalizarIncidencia;
