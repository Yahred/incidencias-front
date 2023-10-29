import { useMemo } from 'react';
import { useQuery } from 'react-query';

import groupBy from '@functions/groupBy';
import { obtenerIncidencias } from '@services';
import { EstatusEnum } from '@constants/estatus';

const useSliderIncidencias = (departamento: string) => {
  const { data: incidencias, isFetching, refetch } = useQuery({
    queryKey: ['incidencias', departamento],
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

  return {
    sliders: incidenciasPorDepartamento,
    isFetching,
    estatus,
    departamentos,
    refetch
  };
};

export default useSliderIncidencias;
