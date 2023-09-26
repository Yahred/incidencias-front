import { FC } from 'react';

import { Cabeceros } from '../../../../../components/Table';

import Catalogo from '../../../components/Catalogo';
import { IModelo } from '../../../../../interfaces/Modelo';
import { eliminarModelo, obtenerModelosPaginado } from '../../../services/modelos';

const cabeceros: Cabeceros<IModelo>[] = [
  {
    label: 'Modelo',
    key: 'nombre',
  },
  {
    label: 'Categoria',
    transform: ({ categoria }) => categoria.nombre
  },
  {
    label: 'Descripción',
    key: 'descripcion',
  },
];

const Modelos: FC = () => {
  return (
    <Catalogo
      cabeceros={cabeceros}
      queryFn={obtenerModelosPaginado}
      deleteFn={eliminarModelo}
      agregarText="Agregar modelo"
      title="Modelos"
      placeholderBusqueda="Buscar modelo"
    />
  );
};

export default Modelos;
