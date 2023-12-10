import { FC, useCallback } from 'react';

import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueries, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import ContenedorFormulario from '../../../components/ContenedorFormulario';
import FormField from '@components/formularios/FormField';
import FormFile from '@components/formularios/FormFile';
import FormSelect from '@components/formularios/FormSelect';
import Table from '@components/generales/Table';

import objectToFormData from '@functions/objectToFormData';
import useFormSetEffect from '@hooks/useSetForm';
import { CAMPO_REQUERIDO, CAMPO_NUMERICO } from '@constants/validaciones';
import { Recurso } from '@interfaces/Recurso';
import {
  obtenerAreas,
  obtenerCategorias,
  obtenerEdicios,
  obtenerSalones,
  obtenerRecursoPorId,
  registrarRecurso,
  obtenerModelos,
  obtenerCambiosPorRecursoId,
} from '@services';
import { Cabeceros } from '@components/generales/Table';
import { CambioRecurso } from '@interfaces/CambioRecurso';
import { format, parseISO } from 'date-fns';
import { Incidencia } from '../../../../../interfaces';
import { Box } from '@mui/material';
import IndicadorEstatus from '../../../../../components/incidencias/IndicadorEstatus';
import { Estatus } from '../../../../../interfaces/Estatus';

const recursoSchema = yup.object({
  folio: yup.string().required(CAMPO_REQUERIDO),
  nombre: yup.string().required(CAMPO_REQUERIDO),
  descripcion: yup.string(),
  area: yup.string().required(CAMPO_REQUERIDO),
  categoria: yup.string().required(CAMPO_REQUERIDO),
  modelo: yup.string().required(CAMPO_REQUERIDO),
  foto: yup.mixed(),
  costo: yup.number().typeError(CAMPO_NUMERICO).required(CAMPO_REQUERIDO),
  edificio: yup.string().required(CAMPO_REQUERIDO),
  salon: yup.string().required(CAMPO_REQUERIDO),
});

const cabecerosCambio: Cabeceros<CambioRecurso>[] = [
  {
    label: 'Fecha',
    transform: ({ fechaCreacion }) =>
      format(parseISO(fechaCreacion), 'yyyy-MM-dd'),
  },
  {
    label: 'Incidencia',
    transform: ({ incidencia }) => (incidencia as Incidencia)?.folio,
  },
  {
    label: 'Motivo',
    key: 'motivo',
  },
  {
    label: 'Estatus',
    transform: ({ estatus }) => <IndicadorEstatus estatus={estatus as Estatus} />
  }
];

const RecursoFormulario: FC = () => {
  const { id } = useParams();

  const form = useForm({
    resolver: yupResolver(recursoSchema),
  });

  const areaSeleccionada = form.watch('area');
  const edificioSeleccionado = form.watch('edificio');
  const categoriaSeleccionada = form.watch('categoria');

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

  const { data: cambios } = useQuery({
    queryKey: ['cambios-por-recurso', id],
    queryFn: () => obtenerCambiosPorRecursoId(id!),
    enabled: !!id,
    initialData: [],
  });

  const guardar = useCallback(
    async (recurso: Recurso) => {
      const formData = objectToFormData(recurso);
      await mutateAsync(formData);
    },
    [mutateAsync]
  );

  useFormSetEffect(modelo, form.setValue);

  return (
    <ContenedorFormulario
      title="Registro de recursos"
      subtitle="Da de alta un nuevo recurso en el sistema"
      methods={form}
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
        title="Descripción"
        subtitle="Descripción sobre el recurso"
      />
      <FormFile name="foto" title="Foto" subtitle="Fotografía del recurso" />
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
      {!!cambios?.length && (
        <Box
          gridColumn={{
            lg: 'span 2 / span 2',
            xs: 'span 1 / span 1'
          }}
          width="100%"
        >
          <Table cabeceros={cabecerosCambio} rows={cambios} />
        </Box>
      )}
    </ContenedorFormulario>
  );
};

export default RecursoFormulario;
