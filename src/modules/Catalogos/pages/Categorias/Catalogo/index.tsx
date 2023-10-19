import { FC } from 'react';

import Catalogo from '../../../components/Catalogo';
import { Cabeceros } from '../../../../../components/Table';

import { eliminarCategoria, obtenerCategoriasPaginado } from '../../../../../services/categorias';
import { Categoria } from '../../../../../interfaces/Categoria';

const cabeceros: Cabeceros<Categoria>[] = [
  {
    label: 'Salón',
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
      queryFn={obtenerCategoriasPaginado}
      deleteFn={eliminarCategoria}
      agregarText="Agregar categoría"
      title="Categorías"
      placeholderBusqueda="Buscar categoría"
    />
  );
};

export default Categorias;
