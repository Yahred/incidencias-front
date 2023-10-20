import { FC, useEffect, useMemo } from 'react';

import { useQuery } from 'react-query';

import Stack from '@mui/material/Stack';

import Select from '@components/Select';

import {
  obtenerEdicios,
  obtenerDepartamentos,
  obtenerModelos,
  obtenerCategorias,
} from '@services';
import { IFiltrosConfiguracion } from '@interfaces/Reportes';

interface FiltrosConfiguracionProps {
  value: IFiltrosConfiguracion;
  onChange: (value: IFiltrosConfiguracion) => void;
}

const FiltrosConfiguracion: FC<FiltrosConfiguracionProps> = ({
  value,
  onChange,
}) => {
  const flexBasis = useMemo(() => 200, []);

  const { data: departamentos } = useQuery({
    queryKey: 'departamentos',
    queryFn: obtenerDepartamentos,
    initialData: [],
  });

  const { data: edificios } = useQuery({
    queryKey: ['edificios', value.departamento],
    queryFn: () => obtenerEdicios(value.departamento),
    initialData: [],
    enabled: !!value.departamento,
  });

  const { data: categorias } = useQuery({
    queryKey: 'categorias',
    queryFn: () => obtenerCategorias(),
    initialData: [],
  });

  const { data: modelos } = useQuery({
    queryKey: ['modelos', value.categoria],
    queryFn: () => obtenerModelos(value.categoria),
    initialData: [],
    enabled: !!value.categoria,
  });

  useEffect(() => {
    onChange({
      ...value,
      edificio: '',
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.departamento]);

  useEffect(() => {
    onChange({
      ...value,
      modelo: '',
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.categoria]);

  return (
    <Stack direction="row-reverse" flexWrap="wrap" gap={2}>
      <Select
        name="departamento"
        title="Departamento"
        onChange={onChange}
        value={value.departamento}
        options={departamentos!}
        containerSx={{ flexBasis }}
        isHandleChange
      />
      <Select
        name="edificio"
        title="Edificio"
        onChange={onChange}
        value={value.edificio}
        options={edificios!}
        containerSx={{ flexBasis }}
        disabled={!edificios?.length}
        isHandleChange
      />
      <Select
        name="categoria"
        title="Categoría"
        onChange={onChange}
        value={value.categoria}
        options={categorias!}
        containerSx={{ flexBasis }}
        isHandleChange
      />
      <Select
        name="modelo"
        title="Modelo"
        onChange={onChange}
        value={value.modelo}
        options={modelos!}
        containerSx={{ flexBasis }}
        disabled={!modelos?.length}
        isHandleChange
      />
    </Stack>
  );
};

export default FiltrosConfiguracion;
