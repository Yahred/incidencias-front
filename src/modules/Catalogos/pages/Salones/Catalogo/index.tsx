import { FC } from 'react';

import Catalogo from '../../../components/Catalogo';
import { Cabeceros } from '../../../../../components/Table';

import { eliminarSalon, obtenerSalonesPaginado } from '../../../../../services/salones';
import { Salon } from '@interfaces/Salon';
import { Edificio } from '@interfaces/Edificio';

const cabeceros: Cabeceros<Salon>[] = [
  {
    label: 'Salón',
    key: 'nombre',
  },
  {
    label: 'Edificio',
    transform: ({ edificio }) => (edificio as Edificio).nombre,
  },
  {
    label: 'Descripción',
    key: 'descripcion',
    transform: ({ descripcion }) => descripcion || 'N / A'
  },
];

const Salones: FC = () => {
  return (
    <Catalogo
      cabeceros={cabeceros}
      queryFn={obtenerSalonesPaginado}
      deleteFn={eliminarSalon}
      agregarText="Agregar salón"
      title="Salones"
      placeholderBusqueda="Buscar salón"
    />
  );
};

export default Salones;
