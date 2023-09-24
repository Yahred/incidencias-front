import { FC } from 'react';

import Catalogo from '../../components/Catalogo';
import { Cabeceros } from '../../../../components/Table';

import { obtenerEdificios } from '../../services/edificios';
import { Edificio } from '../../../../interfaces/Edificio';

const cabeceros: Cabeceros<Edificio>[] = [
  {
    label: 'Edificio',
    key: 'nombre',
  },
  {
    label: 'Descripción',
    key: 'descripcion',
    transform: ({ descripcion }) => descripcion || 'N / A'
  },
];

const Edificios: FC = () => {
  return (
    <Catalogo
      cabeceros={cabeceros}
      queryFn={obtenerEdificios}
      agregarText="Agregar edificio"
      title="Edificios"
      placeholderBusqueda="Buscar edificio"
    />
  );
};

export default Edificios;
