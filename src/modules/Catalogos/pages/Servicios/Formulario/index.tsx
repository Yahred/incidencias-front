import { FC, useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

import Stack from '@mui/material/Stack';

import ContenedorFormulario from '../../../components/ContenedorFormulario';
import FormField from '@components/formularios/FormField';
import FormSelect from '@components/formularios/FormSelect';
import FormSlider from '@components/formularios/FormSlider';

import useFormSetEffect from '@hooks/useSetForm';
import { CAMPO_REQUERIDO } from '@constants/validaciones';
import { Servicio } from '@interfaces/Servicio';
import {
  obtenerCategorias,
  obtenerServicioPorId,
  registrarServicio,
} from '@services';
import formatearDuracion from '@functions/formatearDuracion';

const servicioSchema = yup.object({
  nombre: yup.string().required(CAMPO_REQUERIDO),
  descripcion: yup.string().required(CAMPO_REQUERIDO),
  categoria: yup.string().required(CAMPO_REQUERIDO),
  duracion: yup.number().required(CAMPO_REQUERIDO),
});

const ServicioFormulario: FC = () => {
  const { id } = useParams();

  const methods = useForm({
    resolver: yupResolver(servicioSchema),
  });

  const { data: categorias } = useQuery({
    queryKey: 'categorias',
    queryFn: () => obtenerCategorias(),
    initialData: [],
  });

  const { data: servicio } = useQuery({
    queryKey: ['servicio', id],
    queryFn: () => obtenerServicioPorId(id!),
    enabled: !!id,
    initialData: null,
  });

  const { mutateAsync } = useMutation({
    mutationKey: 'servicio',
    mutationFn: (servicio: Servicio) => registrarServicio(servicio, id!),
  });

  const guardar = useCallback(
    async (servicio: Servicio) => {
      await mutateAsync(servicio);
    },
    [mutateAsync]
  );

  useFormSetEffect(servicio, methods.setValue);

  return (
    <ContenedorFormulario
      title="Registro de servicio"
      subtitle="Da de alta un nuevo servicio en el sistema"
      methods={methods}
      onSubmit={guardar}
    >
      <FormField
        name="nombre"
        title="Nombre"
        subtitle="Nombre del servicio"
        required
      />
      <FormField
        name="descripcion"
        title="Descripción"
        subtitle="Descripcion sobre el servicio"
        required
      />
      <FormSelect
        name="categoria"
        title="Categorías"
        subtitle="Selecciona la categoría a la que pertenece el servicio"
        options={categorias!}
        required
      />
      <Stack justifyContent="flex-end">
        <FormSlider
          name="duracion"
          title="Duración"
          subtitle="Selecciona las horas que toma realizar el servicio"
          defaultValue={0.5}
          valueLabelDisplay="auto"
          min={0.5}
          max={48}
          valueLabelFormat={formatearDuracion}
          required
        />
      </Stack>
    </ContenedorFormulario>
  );
};

export default ServicioFormulario;
