import { FC } from 'react';

import Catalogo from '../../../components/Catalogo';
import { Cabeceros } from '@components/Table';

import { ErrorConocido } from '@interfaces/ErrorConocido';
import { eliminarErrorConocido, obtenerErroresConocidosPaginado } from '@services';
import { Categoria } from '../../../../../interfaces';
import { Servicio } from '../../../../../interfaces/Servicio';

const cabeceros: Cabeceros<ErrorConocido>[] = [
  {
    label: 'Título',
    key: 'titulo',
  },
  {
    label: 'Descripción',
    key: 'descripcion',
    transform: ({ descripcion }) => descripcion || 'N / A',
  },
  {
    label: 'Categoria',
    key: 'categoria',
    transform: ({ categoria }) => (categoria as Categoria).nombre || 'N / A',
  },
  {
    label: 'Servicios',
    transform: ({ servicios }) =>
      servicios?.length
        ? (servicios as Servicio[]).map(({ nombre }) => nombre).join(', ')
        : 'N / A',
  },
];

const ErroresConocidos: FC = () => {
  return (
    <Catalogo
      cabeceros={cabeceros}
      queryFn={obtenerErroresConocidosPaginado}
      deleteFn={eliminarErrorConocido}
      agregarText="Agregar error conocido"
      title="Errores conocidos"
      placeholderBusqueda="Buscar error conocido"
    />
  );
};

export default ErroresConocidos;
