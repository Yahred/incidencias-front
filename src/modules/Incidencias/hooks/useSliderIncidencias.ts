import { useMemo } from 'react';
import { useQuery } from 'react-query';

import groupBy from '@functions/groupBy';
import { obtenerIncidenciasPorDepartamento } from '@services';
import { EstatusEnum } from '@constants/estatus';

const useSliderIncidencias = (departamento: string) => {
  const { data: incidencias, isLoading } = useQuery({
    queryKey: ['incidencias', departamento],
    queryFn: () => obtenerIncidenciasPorDepartamento(departamento),
    initialData: [],
  });

  const sliders = useMemo(
    () => groupBy(incidencias!, 'estatus'),
    [incidencias]
  );

  const estatus = useMemo(() => Object.values(EstatusEnum), []);

  return {
    sliders,
    isLoading,
    estatus,
  };
};

export default useSliderIncidencias;
