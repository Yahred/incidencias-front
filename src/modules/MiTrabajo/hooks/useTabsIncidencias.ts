import { useCallback, useState } from 'react';

import { useQuery } from 'react-query';

import { obtenerIncidenciasDelUsuario } from '@services';
import { EstatusEnum } from '@constants/estatus';

const useTabsIncidencias = () => {
  const [indexTab, setIndexTab] = useState<EstatusEnum>(EstatusEnum.Terminada);

  const { data: incidenciasTerminadas } = useQuery({
    queryKey: 'incidenciasTerminadas',
    queryFn: () =>
      obtenerIncidenciasDelUsuario({ estatus: EstatusEnum.Terminada }),
    initialData: [],
  });

  const { data: incidenciasRechazadas } = useQuery({
    queryKey: 'incidenciasRechazadas',
    queryFn: () =>
      obtenerIncidenciasDelUsuario({ estatus: EstatusEnum.Rechazada }),
  });

  const handleTabChange = useCallback((_, value) => {
    setIndexTab(value);
  }, []);

  return {
    indexTab,
    handleTabChange,
    incidenciasTerminadas,
    incidenciasRechazadas,
  };
};

export default useTabsIncidencias;
