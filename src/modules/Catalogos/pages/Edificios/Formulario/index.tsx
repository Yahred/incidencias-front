import { FC, useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import ContenedorFormulario from '../../../components/ContenedorFormulario';
import FormField from '../../../../../components/FormField';

import { CAMPO_REQUERIDO } from '../../../../../constants/validaciones';
import { registrarEdificio } from '../../../services/edificios';
import { Edificio } from '../../../../../interfaces/Edificio';

const edificioSchema = yup.object({
  nombre: yup.string().required(CAMPO_REQUERIDO),
  descripcion: yup.string(),
})

const EdificioFormulario: FC = () => {
  const methods = useForm({
    resolver: yupResolver(edificioSchema),
  });

  const { mutateAsync } = useMutation({
    mutationKey: 'edificio',
    mutationFn: registrarEdificio
  });

  const guardar = useCallback(async (edificio: Edificio) => {
    await mutateAsync(edificio)
  }, [mutateAsync]);

  return (
    <ContenedorFormulario
      title="Registro de edificios"
      subtitle="Da de alta un nuevo edificio en el sistema"
      methods={methods}
      onSubmit={guardar}
    >
      <FormField
        name="nombre"
        title="Nombre"
        subtitle="Nombre del edificio"
        required
      />
      <FormField
        name="descripcion"
        title="Descripcion"
        subtitle="Descripcion sobre el edificio"
      />
    </ContenedorFormulario>
  );
};

export default EdificioFormulario;
