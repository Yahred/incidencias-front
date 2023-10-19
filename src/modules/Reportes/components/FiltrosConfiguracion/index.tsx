import { FC } from 'react';

import { useQuery } from 'react-query';

import Stack from '@mui/material/Stack';

import Select from '@components/Select';

import { obtenerEdicios } from '../../../../services/edificios';
import { obtenerDepartamentos } from '../../../../services/departamentos';
import { obtenerModelos } from '../../../../services/modelos';
import { obtenerCategorias } from '../../../../services/categorias';
import { IFiltrosConfiguracion } from '@interfaces/Reportes';


interface FiltrosConfiguracionProps {
  value: IFiltrosConfiguracion;
  onChange: (value: IFiltrosConfiguracion) => void;
}

const FiltrosConfiguracion: FC<FiltrosConfiguracionProps> = ({ value, onChange }) => {
  const { data: edificios } = useQuery({
    queryKey: 'edificios',
    queryFn: obtenerEdicios,
    initialData: [],
  });

  const { data: departamentos } = useQuery({
    queryKey: 'departamentos',
    queryFn: obtenerDepartamentos,
    initialData: [],
  });

  const { data: modelos } = useQuery({
    queryKey: 'modelos',
    queryFn: () => obtenerModelos(),
    initialData: [],
  });

  const { data: categorias } = useQuery({
    queryKey: 'categorias',
    queryFn: () => obtenerCategorias(),
    initialData: [],
  });

  return (
    <Stack direction="row-reverse" flexWrap="wrap" gap={2}>
      <Select
        name="departamento"
        title="Departamento"
        onChange={onChange}
        value={value.departamento}
        options={departamentos!}
        containerSx={{ flexBasis: 240 }}
        isHandleChange
      />
      <Select
        name="edificio"
        title="Edificio"
        onChange={onChange}
        value={value.edificio}
        options={edificios!}
        containerSx={{ flexBasis: 240 }}
        isHandleChange
      />
      <Select
        name="categoria"
        title="Categorías"
        onChange={onChange}
        value={value.categoria}
        options={categorias!}
        containerSx={{ flexBasis: 240 }}
        isHandleChange
      />
      <Select
        name="modelo"
        title="Modelos"
        onChange={onChange}
        value={value.modelo}
        options={modelos!}
        containerSx={{ flexBasis: 240 }}
        isHandleChange
      />
    </Stack>
  );
};

export default FiltrosConfiguracion;
