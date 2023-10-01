import { FC, useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import ContenedorFormularioC from '../../../components/ContenedorFormulario';
import FormField from '../../../../../components/FormField';
import FormSelect from '../../../../../components/FormSelect';

import { CAMPO_REQUERIDO } from '../../../../../constants/validaciones';
import { registrarSalon } from '../../../../../services/salones';
import { obtenerEdicios } from '../../../../../services/edificios';
import { Salon } from '../../../../../interfaces/Salon';

const salonSchema = yup.object({
  nombre: yup.string().required(CAMPO_REQUERIDO),
  descripcion: yup.string(),
  edificio: yup.string().required(CAMPO_REQUERIDO)
})

const SalonFormulario: FC = () => {
  const methods = useForm({
    resolver: yupResolver(salonSchema),
  });

  const { data: edificios } = useQuery({
    queryKey: 'edificios',
    queryFn: obtenerEdicios,
    initialData: []
  })

  const { mutateAsync } = useMutation({
    mutationKey: 'salon',
    mutationFn: registrarSalon
  });

  const guardar = useCallback(async (salon: Salon) => {
    await mutateAsync(salon)
  }, [mutateAsync]);

  return (
    <ContenedorFormularioC
      title="Registro de salón"
      subtitle="Da de alta un nuevo salón en el sistema"
      methods={methods}
      onSubmit={guardar}
    >
      <FormField
        name="nombre"
        title="Nombre"
        subtitle="Nombre del salón"
        required
      />
      <FormField
        name="descripcion"
        title="Descripcion"
        subtitle="Descripcion sobre el salón"
      />
      <FormSelect
        name='edificio'
        title='Edificio'
        subtitle='Selecciona el edificio al que pertenece el salón'
        options={edificios!}
      />
    </ContenedorFormularioC>
  );
};

export default SalonFormulario;
