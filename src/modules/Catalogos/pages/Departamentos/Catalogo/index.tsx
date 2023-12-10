import { FC } from 'react';

import Catalogo from '../../../components/Catalogo';
import { Cabeceros } from '../../../../../components/generales/Table';

import { eliminarDepartamento, obtenerDepartamentosPaginado } from '../../../../../services/departamentos';
import { Departamento } from 'src/interfaces/Departamento';

const cabeceros: Cabeceros<Departamento>[] = [
  {
    label: 'Departamento',
    key: 'nombre',
  },
  {
    label: 'Descripción',
    key: 'descripcion',
    transform: ({ descripcion }) => descripcion || 'N / A'
  },
];

const Categorias: FC = () => {
  return (
    <Catalogo
      cabeceros={cabeceros}
      queryFn={obtenerDepartamentosPaginado}
      deleteFn={eliminarDepartamento}
      agregarText="Agregar departamento"
      title="Departamentos"
      placeholderBusqueda="Buscar departamento"
    />
  );
};

export default Categorias;
