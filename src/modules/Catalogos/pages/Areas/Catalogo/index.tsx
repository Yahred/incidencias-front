import { FC } from 'react';

import Catalogo from '../../../components/Catalogo';
import { Cabeceros } from '../../../../../components/Table';

import { Area } from '../../../../../interfaces/Area';
import { eliminarArea, obtenerAreasPaginado } from '../../../services/areas';

const cabeceros: Cabeceros<Area>[] = [
  {
    label: 'Área',
    key: 'nombre',
  },
  {
    label: 'Descripción',
    key: 'descripcion',
    transform: ({ descripcion }) => descripcion || 'N / A'
  },
];

const Areas: FC = () => {
  return (
    <Catalogo
      cabeceros={cabeceros}
      queryFn={obtenerAreasPaginado}
      deleteFn={eliminarArea}
      agregarText="Agregar área"
      title="Áreas"
      placeholderBusqueda="Buscar área"
    />
  );
};

export default Areas;
