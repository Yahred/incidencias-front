import { useQuery } from 'react-query';

import { obtenerIncidenciasDelUsuario } from '@services';
import { useMemo } from 'react';
import { EstatusEnum } from '../../../constants/estatus';

const useMisIncidencias = (esTecnico: boolean) => {
  const { data: incidencias, refetch } = useQuery({
    queryKey: ['incidencias', esTecnico],
    queryFn: () =>
      obtenerIncidenciasDelUsuario({
        atiende: Number(esTecnico),
      }),
    initialData: [],
    staleTime: 0,
  });

  const incidenciasTerminadas = useMemo(() =>
    incidencias?.filter(({ estatus }) => estatus.id === EstatusEnum.Terminada)
  , [incidencias]);

  const incidenciasValidadas = useMemo(() =>
    incidencias?.filter(({ estatus }) => estatus.id === EstatusEnum.Validado)
  , [incidencias]);

  const incidenciasSlider = useMemo(() =>
    incidencias?.filter(({ estatus }) => estatus.id !== EstatusEnum.Validado && estatus.id !== EstatusEnum.Terminada)
  , [incidencias]);

  return {
    incidencias,
    refetch,
    incidenciasSlider,
    incidenciasTerminadas,
    incidenciasValidadas,
  };
};

export default useMisIncidencias;
