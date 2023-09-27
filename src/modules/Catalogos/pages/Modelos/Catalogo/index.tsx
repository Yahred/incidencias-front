import { FC } from 'react';

import { Cabeceros } from '../../../../../components/Table';

import Catalogo from '../../../components/Catalogo';
import { Modelo } from '../../../../../interfaces/Modelo';
import { eliminarModelo, obtenerModelosPaginado } from '../../../services/modelos';
import { Categoria } from '../../../../../interfaces/Categoria';

const cabeceros: Cabeceros<Modelo>[] = [
  {
    label: 'Modelo',
    key: 'nombre',
  },
  {
    label: 'Categoria',
    transform: ({ categoria }) => (categoria as Categoria).nombre
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
