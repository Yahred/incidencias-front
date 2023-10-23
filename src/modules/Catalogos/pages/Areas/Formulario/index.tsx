import { FC, useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

import ContenedorFormularioC from '../../../components/ContenedorFormulario';
import FormField from '@components/FormField';

import { CAMPO_REQUERIDO } from '@constants/validaciones';
import { obtenerAreaPorId, registrarArea } from '@services';
import { Area } from '@interfaces/Area';
import useFormSetEffect from '@hooks/useSetForm';

const salonSchema = yup.object({
  nombre: yup.string().required(CAMPO_REQUERIDO),
  descripcion: yup.string(),
})

const AreaFormulario: FC = () => {
  const { id } = useParams();

  const methods = useForm({
    resolver: yupResolver(salonSchema),
  });

  const { data: area } = useQuery({
    queryKey: ['area', id],
    enabled: !!id,
    queryFn: () => obtenerAreaPorId(id!),
    initialData: null,
  });

  const { mutateAsync } = useMutation({
    mutationKey: 'area',
    mutationFn: (area: Area) => registrarArea(area, id),
  });

  const guardar = useCallback(async (area: Area) => {
    await mutateAsync(area)
  }, [mutateAsync]);

  useFormSetEffect(area, methods.setValue);

  return (
    <ContenedorFormularioC
      title="Registro de área"
      subtitle="Da de alta una nueva área en el sistema"
      methods={methods}
      onSubmit={guardar}
    >
      <FormField
        name="nombre"
        title="Nombre"
        subtitle="Nombre del área"
        required
      />
      <FormField
        name="descripcion"
        title="Descripcion"
        subtitle="Descripcion sobre el área"
      />
    </ContenedorFormularioC>
  );
};

export default AreaFormulario;
