import { useCallback, useEffect, useMemo } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import useSocketStore from '../../../stores/socket/socket.store';
import groupBy from '@functions/groupBy';
import { obtenerIncidencias } from '@services';
import { EstatusEnum } from '@constants/estatus';
import { EventosSocket } from '@constants/eventosSocket';
import { Incidencia } from '@interfaces/Incidencia';

const useSliderIncidencias = () => {
  const socket = useSocketStore(({ socket }) => socket);
  const queryClient = useQueryClient();

  const { data: incidencias, isFetching, refetch } = useQuery({
    queryKey: ['incidencias'],
    queryFn: obtenerIncidencias,
    initialData: [],
  });

  const incidenciasPorDepartamento = useMemo(
    () =>
      groupBy(
        incidencias!.map((incidencia) => ({
          ...incidencia,
          departamentoId: incidencia.departamento.id,
        })),
        'departamentoId'
      ),
    [incidencias]
  );

  const departamentos = useMemo(
    () =>
      incidencias
        ?.map(({ departamento }) => departamento)
        .filter(
          ({ id: a }, index, arr) =>
            index === arr.findIndex(({ id: b }) => a === b)
        ),
    [incidencias]
  );

  const estatus = useMemo(() => Object.values(EstatusEnum), []);

  const agregarIncidenciaEntrante = useCallback((incidencia: Incidencia) => {
    queryClient.setQueryData(['incidencias'], [incidencia, ...incidencias!])
  }, [queryClient, incidencias]);

  useEffect(() => {
    socket?.on(EventosSocket.NuevaIncidencia, agregarIncidenciaEntrante);

    return () => {
      socket?.off(EventosSocket.NuevaIncidencia);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return {
    sliders: incidenciasPorDepartamento,
    isFetching,
    estatus,
    departamentos,
    refetch,
  };
};

export default useSliderIncidencias;
