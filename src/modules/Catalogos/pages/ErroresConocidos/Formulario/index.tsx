import { FC } from 'react';

import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import ContenedorFormulario from '../../../components/ContenedorFormulario';
import FormField from '@components/formularios/FormField';
import FormSelect from '@components/formularios/FormSelect';

import useFormSetEffect from '@hooks/useSetForm';
import { CAMPO_REQUERIDO } from '@constants/validaciones';
import { useParams } from 'react-router-dom';
import { ErrorConocido } from '@interfaces/ErrorConocido';
import {
  obtenerCategorias,
  obtenerErrorConocidoPorId,
  obtenerServicios,
  registrarErrorConocido,
} from '@services';

const errorConocidoSchema = yup.object({
  titulo: yup.string().required(CAMPO_REQUERIDO),
  descripcion: yup.string().required(CAMPO_REQUERIDO),
  categoria: yup.string().required(CAMPO_REQUERIDO),
  servicios: yup.array().of(yup.string()),
});

const ErrorConocidoFormulario: FC = () => {
  const form = useForm({
    resolver: yupResolver(errorConocidoSchema),
  });

  const { id } = useParams();

  const categoriaSeleccionada = form.watch('categoria');

  const { data: errorConocido } = useQuery({
    queryKey: ['error-conocido', id],
    enabled: !!id,
    queryFn: () => obtenerErrorConocidoPorId(id!),
    initialData: null,
  });

  const { data: categorias } = useQuery({
    queryKey: 'categorias',
    queryFn: () => obtenerCategorias(),
    initialData: [],
  });

  const { data: servicios } = useQuery({
    queryKey: ['servicios', categoriaSeleccionada],
    queryFn: () => obtenerServicios(categoriaSeleccionada),
    initialData: [],
    enabled: !!categoriaSeleccionada || !!id,
  });

  const { mutateAsync: registrarErrorConocidoMut } = useMutation({
    mutationKey: 'edificio',
    mutationFn: (errorConocido: ErrorConocido) =>
      registrarErrorConocido(errorConocido, id),
  });

  useFormSetEffect(errorConocido, form.setValue);

  return (
    <ContenedorFormulario
      title="Registro de error conocido"
      subtitle="Da de alta un nuevo error conocido en el sistema"
      methods={form}
      onSubmit={registrarErrorConocidoMut}
    >
      <FormField
        name="titulo"
        title="Título"
        subtitle="Título del error conocido"
        defaultValue={errorConocido?.titulo}
        required
      />
      <FormSelect
        name="categoria"
        title="Categoría"
        subtitle="Categoría a la que pertenece el error conocido"
        options={categorias!}
        defaultValue={errorConocido?.categoria as string}
        required
      />
      <FormSelect
        name="servicios"
        title="Servicios"
        subtitle="Los servicios que implica el error"
        options={servicios!}
        defaultValue={errorConocido?.servicios as string[]}
        multi
      />
      <FormField
        name="descripcion"
        title="Descripción"
        subtitle="Descripción sobre el error conocido"
        defaultValue={errorConocido?.descripcion}
        rows={5}
        required
        multiline
      />
    </ContenedorFormulario>
  );
};

export default ErrorConocidoFormulario;
