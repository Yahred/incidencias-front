import { FC, useCallback, useEffect, useMemo } from 'react';

import { useForm } from 'react-hook-form';
import { useMutation, useQueries, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

import ContenedorFormularioC from '../../../components/ContenedorFormulario';
import FormField from '@components/formularios/FormField';
import FormSelect from '@components/formularios/FormSelect';
import FormFile from '@components/formularios/FormFile';

import useFormSetEffect from '@hooks/useSetForm';
import objectToFormData from '@functions/objectToFormData';
import {
  obtenerAreas,
  obtenerTiposUsuario,
  obtenerUsuarioPorId,
  registrarUsuario,
  obtenerDepartamentos,
} from '@services';
import { Usuario } from '@interfaces/Usuario';
import { CAMPO_REQUERIDO, EMAIL_INVALIDO } from '@constants/validaciones';
import { TiposUsuario } from '@constants/tiposUsuario';

const usuarioSchema = yup.object({
  id: yup.string(),
  username: yup.string().required(CAMPO_REQUERIDO),
  password: yup.string().when('id', {
    is: (id: string) => !id,
    then: () => yup.string().required(CAMPO_REQUERIDO),
  }),
  nombres: yup.string().required(CAMPO_REQUERIDO),
  apellidoPat: yup.string().required(CAMPO_REQUERIDO),
  apellidoMat: yup.string().required(CAMPO_REQUERIDO),
  email: yup.string().email(EMAIL_INVALIDO).required(CAMPO_REQUERIDO),
  avatar: yup.mixed(),
  departamento: yup.string().when('tipoUsuario', {
    is: (tipoUsuario: string) => tipoUsuario === TiposUsuario.Academico,
    then: () => yup.string().required(CAMPO_REQUERIDO),
  }),
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

  const requiereArea = useMemo(
    () =>
      tipoUsuarioSeleccionado === TiposUsuario.Tecnico ||
      tipoUsuarioSeleccionado === TiposUsuario.Especialista,
    [tipoUsuarioSeleccionado]
  );

  const [{ data: usuario }, { data: tiposUsuario }, { data: departamentos }] =
    useQueries([
      {
        queryKey: ['usuario', id],
        queryFn: () => obtenerUsuarioPorId(id!),
        enabled: !!id,
        staleTime: 0,
      },
      {
        queryKey: 'tipos-usuario',
        queryFn: obtenerTiposUsuario,
        staleTime: Infinity,
      },
      {
        queryKey: 'departamentos',
        queryFn: obtenerDepartamentos,
        staleTime: Infinity,
      },
    ]);

  const { data: areas } = useQuery({
    queryFn: obtenerAreas,
    queryKey: 'areas',
    enabled: requiereArea,
    staleTime: Infinity,
  });

  const { mutateAsync } = useMutation({
    mutationKey: 'usuario',
    mutationFn: (usuario: FormData) => registrarUsuario(usuario, id),
  });

  const guardar = useCallback(
    async (usuario: Usuario) => {
      const formData = objectToFormData(usuario);
      await mutateAsync(formData);
    },
    [mutateAsync]
  );

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
      <FormSelect
        name="tipoUsuario"
        options={tiposUsuario!}
        title="Tipo de usuario"
        subtitle="Seleccione el tipo de usuario"
        required
      />
      <FormFile
        name="avatar"
        title="Avatar"
        subtitle="Fotografía del usuario"
        accept="image/png, image/gif, image/jpeg"
        previewSrc={usuario?.avatar}
        showPreview
      />
      {requiereArea && (
        <FormSelect
          name="areas"
          options={areas!}
          title="Áreas"
          subtitle="Áreas las cuales puede atender el técnico"
          required
          multi
        />
      )}
      {tipoUsuarioSeleccionado === TiposUsuario.Academico && (
        <FormSelect
          name="departamento"
          options={departamentos!}
          title="Departamento"
          subtitle="Seleccione el departamento del usuario"
          required
        />
      )}
    </ContenedorFormularioC>
  );
};

export default UsuarioFormulario;
