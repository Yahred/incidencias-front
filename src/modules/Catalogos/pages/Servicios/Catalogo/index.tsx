import { FC } from 'react';

import Catalogo from '../../../components/Catalogo';
import { Cabeceros } from '@components/generales/Table';

import { Servicio } from '@interfaces/Servicio';
import { eliminarServicio, obtenerServiciosPaginado } from '@services';
import formatearDuracion from '@functions/formatearDuracion';

const cabeceros: Cabeceros<Servicio>[] = [
  {
    label: 'Servicio',
    key: 'nombre',
  },
  {
    label: 'Descripción',
    key: 'descripcion',
  },
  {
    label: 'Duración',
    key: 'duracion',
    transform: ({ duracion }) => formatearDuracion(duracion)
  },
  {
    label: 'Categoría',
    transform: ({ categoria }) => categoria?.nombre,
  },
];

const Servicios: FC = () => {
  return (
    <Catalogo
      cabeceros={cabeceros}
      queryFn={obtenerServiciosPaginado}
      deleteFn={eliminarServicio}
      agregarText="Agregar servicio"
      title="Servicios"
      placeholderBusqueda="Buscar servicio"
    />
  );
};

export default Servicios;
