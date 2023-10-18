import { FC, useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import ContenedorFormularioC from '../../../components/ContenedorFormulario';
import FormField from '@components/FormField';

import { CAMPO_REQUERIDO } from '@constants/validaciones';
import { registrarArea } from '@services/areas';
import { Area } from '@interfaces/Area';

const salonSchema = yup.object({
  nombre: yup.string().required(CAMPO_REQUERIDO),
  descripcion: yup.string(),
})

const AreaFormulario: FC = () => {
  const methods = useForm({
    resolver: yupResolver(salonSchema),
  });

  const { mutateAsync } = useMutation({
    mutationKey: 'area',
    mutationFn: registrarArea
  });

  const guardar = useCallback(async (area: Area) => {
    await mutateAsync(area)
  }, [mutateAsync]);

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
