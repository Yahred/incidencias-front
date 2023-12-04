import { FC, useCallback } from 'react';

import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueries, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import ContenedorFormulario from '../../../components/ContenedorFormulario';
import FormField from '@components/FormField';
import FormFile from '@components/FormFile';
import FormSelect from '@components/FormSelect';

import objectToFormData from '@functions/objectToFormData';
import useFormSetEffect from '@hooks/useSetForm';
import { CAMPO_REQUERIDO } from '@constants/validaciones';
import { Recurso } from '@interfaces/Recurso';
import {
  obtenerAreas,
  obtenerCategorias,
  obtenerEdicios,
  obtenerSalones,
  obtenerRecursoPorId,
  registrarRecurso,
  obtenerModelos
} from '@services';

const recursoSchema = yup.object({
  folio: yup.string().required(CAMPO_REQUERIDO),
  nombre: yup.string().required(CAMPO_REQUERIDO),
  descripcion: yup.string(),
  area: yup.string().required(CAMPO_REQUERIDO),
  categoria: yup.string().required(CAMPO_REQUERIDO),
  modelo: yup.string().required(CAMPO_REQUERIDO),
  foto: yup.mixed(),
  costo: yup.number().required(CAMPO_REQUERIDO),
  edificio: yup.string().required(CAMPO_REQUERIDO),
  salon: yup.string().required(CAMPO_REQUERIDO),
});

const RecursoFormulario: FC = () => {
  const { id } = useParams();

  const methods = useForm({
    resolver: yupResolver(recursoSchema),
  });

  const areaSeleccionada = methods.watch('area');
  const edificioSeleccionado = methods.watch('edificio');
  const categoriaSeleccionada = methods.watch('categoria');

  const { mutateAsync } = useMutation({
    mutationKey: 'recurso',
    mutationFn: (recurso: FormData) => registrarRecurso(recurso, id),
  });

  const [{ data: areas }, { data: edificios }, { data: modelo }] = useQueries([
    {
      queryKey: 'areas',
      queryFn: obtenerAreas,
      initialData: [],
    },
    {
      queryKey: 'edificios',
      queryFn: () => obtenerEdicios(),
      initialData: [],
    },
    {
      queryKey: ['recurso', id],
      queryFn: () => obtenerRecursoPorId(id!),
      enabled: !!id,
    },
  ]);

  const { data: salones } = useQuery({
    queryKey: ['salones', edificioSeleccionado],
    queryFn: () => obtenerSalones(edificioSeleccionado),
    enabled: !!edificioSeleccionado,
    initialData: [],
  });

  const { data: categorias } = useQuery({
    queryKey: ['categorias', areaSeleccionada],
    queryFn: () => obtenerCategorias(areaSeleccionada),
    enabled: !!areaSeleccionada,
    initialData: [],
  });

  const { data: modelos } = useQuery({
    queryKey: ['modelos', categoriaSeleccionada],
    queryFn: () => obtenerModelos(categoriaSeleccionada),
    enabled: !!categoriaSeleccionada,
    initialData: [],
  });

  const guardar = useCallback(
    async (recurso: Recurso) => {
      const formData = objectToFormData(recurso);
      await mutateAsync(formData);
    },
    [mutateAsync]
  );

  useFormSetEffect(modelo, methods.setValue);

  return (
    <ContenedorFormulario
      title="Registro de recursos"
      subtitle="Da de alta un nuevo recurso en el sistema"
      methods={methods}
      onSubmit={guardar}
    >
      <FormField
        name="folio"
        title="Folio"
        subtitle="Folio del recurso"
        required
      />
      <FormField
        name="nombre"
        title="Nombre"
        subtitle="Nombre del recurso"
        required
      />
      <FormField
        name="descripcion"
        title="Descripcion"
        subtitle="Descripcion sobre el recurso"
      />
      <FormFile
        name="foto"
        title="Foto"
        subtitle="Fotografía del recurso"
      />
      <FormField
        name="costo"
        title="Costo"
        subtitle="Costo del recurso (MXN)"
      />
      <FormSelect
        name="edificio"
        title="Edificio"
        subtitle="Edificio en donde se encuentra el recurso"
        options={edificios!}
        required
      />
      <FormSelect
        name="salon"
        title="Salón"
        subtitle="Salón en donde se encuentra el recurso"
        options={salones!}
        disabled={!edificioSeleccionado}
        required
      />
      <FormSelect
        name="area"
        title="Área"
        subtitle="Área a la que pertenece el recurso"
        options={areas!}
        required
      />
      <FormSelect
        name="categoria"
        title="Categoría"
        subtitle="Categoría a la que pertenece el recurso"
        options={categorias!}
        disabled={!areaSeleccionada}
        required
      />
      <FormSelect
        name="modelo"
        title="Modelo"
        subtitle="Modelo del recurso"
        options={modelos!}
        disabled={!categoriaSeleccionada}
        required
      />
    </ContenedorFormulario>
  );
};

export default RecursoFormulario;
