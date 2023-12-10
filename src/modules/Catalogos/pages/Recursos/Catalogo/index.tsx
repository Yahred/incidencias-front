import { FC } from 'react';

import Catalogo from '../../../components/Catalogo';

import { Cabeceros } from '../../../../../components/generales/Table';

import { eliminarRecurso, obtenerRecursosPaginado } from '../../../../../services/recursos';
import { Recurso } from '../../../../../interfaces/Recurso';
import { Edificio } from '../../../../../interfaces/Edificio';
import { Salon } from '../../../../../interfaces/Salon';
import { Modelo } from '../../../../../interfaces/Modelo';

const cabeceros: Cabeceros<Recurso>[] = [
  {
    label: 'Folio',
    key: 'folio',
  },
  {
    label: 'Nombre',
    key: 'nombre',
  },
  {
    label: 'Descripción',
    key: 'descripcion',
  },
  {
    label: 'Modelo',
    transform: ({ modelo }) => (modelo as Modelo)?.nombre,
  },
  {
    label: 'Salón',
    transform: ({ salon }) => (salon as Salon)?.nombre || '',
  },
  {
    label: 'Edificio',
    transform: ({ edificio }) => (edificio as Edificio)?.nombre || '',
  }
];

const Recursos: FC = () => {
  return (
    <Catalogo
      cabeceros={cabeceros}
      queryFn={obtenerRecursosPaginado}
      deleteFn={eliminarRecurso}
      agregarText="Agregar recurso"
      title="Recursos"
      placeholderBusqueda="Búsqueda por nombre o folio"
    />
  );
};

export default Recursos;
