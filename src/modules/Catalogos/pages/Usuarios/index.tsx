import { FC } from 'react';

import { Cabeceros } from '../../../../components/Table';

import { Usuario } from '../../../../interfaces/Usuario';
import { obtenerUsuarios } from '../../services';
import { TipoUsuario } from '../../../../interfaces/TipoUsuario';
import Catalogo from '../../components/Catalogo';

const cabeceros: Cabeceros<Usuario>[] = [
  {
    label: 'Usuario',
    key: 'username',
  },
  {
    label: 'Nombre',
    transform: ({ nombres, apellidoMat, apellidoPat }) =>
      `${nombres} ${apellidoPat} ${apellidoMat}`,
  },
  {
    label: 'Tipo',
    transform: ({ tipoUsuario }) => (tipoUsuario as TipoUsuario).nombre!,
  },
];

const Usuarios: FC = () => {
  return (
    <Catalogo
      cabeceros={cabeceros}
      queryFn={obtenerUsuarios}
      agregarText="Agregar usuario"
      title="Usuarios"
      placeholderBusqueda="Buscar usuario"
    />
  );
};

export default Usuarios;
