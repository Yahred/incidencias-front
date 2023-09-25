import { FC, useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import ContenedorFormulario from '../../../components/ContenedorFormulario';
import FormField from '../../../../../components/FormField';
import FormSelect from '../../../../../components/FormSelect';

import { obtenerTiposUsuario, registrarUsuario } from '../../../services';
import { Usuario } from '../../../../../interfaces/Usuario';
import { CAMPO_REQUERIDO, EMAIL_INVALIDO } from '../../../../../constants/validaciones';

const usuarioSchema = yup.object({
  username: yup.string().required(CAMPO_REQUERIDO),
  password: yup.string().required(CAMPO_REQUERIDO),
  nombres: yup.string().required(CAMPO_REQUERIDO),
  apellidoPat: yup.string().required(CAMPO_REQUERIDO),
  apellidoMat: yup.string().required(CAMPO_REQUERIDO),
  email: yup.string().email(EMAIL_INVALIDO).required(CAMPO_REQUERIDO),
  avatar: yup.string(),
  tipoUsuario: yup.string().required(CAMPO_REQUERIDO),
})

const UsuarioFormulario: FC = () => {
  const methods = useForm({
    resolver: yupResolver(usuarioSchema),
  });

  const { data: tiposUsuario } = useQuery({
    queryKey: 'tipos-usuario',
    queryFn: obtenerTiposUsuario,
    cacheTime: Infinity,
    initialData: [],
  })

  const { mutateAsync } = useMutation({
    mutationKey: 'usuario',
    mutationFn: registrarUsuario
  });

  const guardar = useCallback(async (usuario: Usuario) => {
    await mutateAsync(usuario)
  }, [mutateAsync]);

  return (
    <ContenedorFormulario
      title="Registro de usuario"
      subtitle="Da de alta un nuevo usuario en el sistema"
      methods={methods}
      onSubmit={guardar}
    >
      <FormField
        name="username"
        title="Nombre de usuario"
        subtitle="Nombre de usuario para acceder al sistema"
        required
      />
      <FormField
        name="password"
        title="Contraseña"
        subtitle="Contraseña para acceder al sistema"
        required
      />
      <FormField
        name="nombres"
        title="Nombres"
        subtitle="Nombres del usuario"
        required
      />
      <FormField
        name="apellidoPat"
        title="Apellido paterno"
        subtitle="Apellido paterno del usuario"
        required
      />
      <FormField
        name="apellidoMat"
        title="Apellido materno"
        subtitle="Apellido materno del usuario"
        required
      />
      <FormField
        name="email"
        title="Email"
        subtitle="Correo electrónico del usuario"
        required
      />
      <FormField
        name="avatar"
        title="Avatar"
        subtitle="Apellido materno del usuario"
      />
      <FormSelect
        name='tipoUsuario'
        options={tiposUsuario!}
        title='Tipo de usuario'
        subtitle='Seleccione el tipo de usuario'
        required
      />
    </ContenedorFormulario>
  );
};

export default UsuarioFormulario;
