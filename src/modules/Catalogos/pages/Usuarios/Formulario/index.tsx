import { FC, useCallback, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useMutation, useQueries, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

import ContenedorFormularioC from '../../../components/ContenedorFormulario';
import FormField from '../../../../../components/FormField';
import FormSelect from '../../../../../components/FormSelect';
import FormFile from '../../../../../components/FormFile';

import useFormSetEffect from '../../../../../utils/hooks/useSetForm';
import objectToFormData from '../../../../../utils/functions/objectToFormData';
import {
  obtenerAreas,
  obtenerTiposUsuario,
  obtenerUsuarioPorId,
  registrarUsuario,
} from '../../../services';
import { Usuario } from '../../../../../interfaces/Usuario';
import {
  CAMPO_REQUERIDO,
  EMAIL_INVALIDO,
} from '../../../../../constants/validaciones';
import { TiposUsuario } from '../../../../../constants/tiposUsuario';

const usuarioSchema = yup.object({
  id: yup.string(),
  username: yup.string().required(CAMPO_REQUERIDO),
  password: yup.string().when('id', {
    is: (id: string) => !id,
    then: () => yup.string().required(CAMPO_REQUERIDO)
  }),
  nombres: yup.string().required(CAMPO_REQUERIDO),
  apellidoPat: yup.string().required(CAMPO_REQUERIDO),
  apellidoMat: yup.string().required(CAMPO_REQUERIDO),
  email: yup.string().email(EMAIL_INVALIDO).required(CAMPO_REQUERIDO),
  avatar: yup.mixed(),
  tipoUsuario: yup.string().required(CAMPO_REQUERIDO),
  areas: yup.array().when('tipoUsuario', {
    is: (tipoUsuario: string) => tipoUsuario === TiposUsuario.Tecnico,
    then: () => yup.array().min(1, CAMPO_REQUERIDO).required(CAMPO_REQUERIDO),
  }),

});

const UsuarioFormulario: FC = () => {
  const { id } = useParams();

  const methods = useForm({
    resolver: yupResolver(usuarioSchema),
  });

  const tipoUsuarioSeleccionado = methods.watch('tipoUsuario');

  const [{ data: usuario }, { data: tiposUsuario }] = useQueries([
    {
      queryKey: ['usuario', id],
      queryFn: () => obtenerUsuarioPorId(id!),
      enabled: !!id,
      staleTime: 0,
    },
    {
      queryKey: 'tipos-usuario',
      queryFn: obtenerTiposUsuario,
      cacheTime: Infinity,
      initialData: [],
    },
  ]);

  const { data: areas } = useQuery({
    queryFn: obtenerAreas,
    queryKey: 'areas',
    enabled: tipoUsuarioSeleccionado === TiposUsuario.Tecnico,
    initialData: [],
  });

  const { mutateAsync } = useMutation({
    mutationKey: 'usuario',
    mutationFn: (usuario: FormData) => registrarUsuario(usuario, id),
  });

  const guardar = useCallback(async (usuario: Usuario) => {
    const tipoUsuarioId = tiposUsuario?.find(({ clave }) => tipoUsuarioSeleccionado === clave)?.id;
    const formData = objectToFormData({ ...usuario, tipoUsuario: tipoUsuarioId });
    await mutateAsync(formData);
  }, [mutateAsync, tipoUsuarioSeleccionado, tiposUsuario]);

  useEffect(() => {
    if (!id) methods.setValue('areas', []);
  }, [id, tipoUsuarioSeleccionado, methods]);

  useFormSetEffect(usuario, methods.setValue);

  return (
    <ContenedorFormularioC
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
      {!id && (
        <FormField
          name="password"
          title="Contraseña"
          subtitle="Contraseña para acceder al sistema"
          required
        />
      )}
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
      <FormFile
        name="avatar"
        title="Avatar"
        subtitle="Fotografía del usuario"
        accept="image/png, image/gif, image/jpeg"
      />
      <FormSelect
        name="tipoUsuario"
        options={tiposUsuario!}
        title="Tipo de usuario"
        subtitle="Seleccione el tipo de usuario"
        bindValue='clave'
        required
      />
      {tipoUsuarioSeleccionado === TiposUsuario.Tecnico && <FormSelect
        name='areas'
        options={areas!}
        title='Áreas'
        subtitle='Áreas las cuales puede atender el técnico'
        required
        multi
      />}
    </ContenedorFormularioC>
  );
};

export default UsuarioFormulario;
