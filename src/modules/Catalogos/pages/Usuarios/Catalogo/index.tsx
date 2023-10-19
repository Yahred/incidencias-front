import { FC } from 'react';

import { Cabeceros } from '../../../../../components/Table';

import Catalogo from '../../../components/Catalogo';
import { Usuario } from '../../../../../interfaces/Usuario';
import { eliminarUsuario, obtenerUsuariosPaginado } from '../../../../../services';
import { TipoUsuario } from '../../../../../interfaces/TipoUsuario';

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
    label: 'Departamento',
    transform: ({ departamento }) => departamento?.nombre,
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
      queryFn={obtenerUsuariosPaginado}
      deleteFn={eliminarUsuario}
      agregarText="Agregar usuario"
      title="Usuarios"
      placeholderBusqueda="Buscar usuario"
    />
  );
};

export default Usuarios;
