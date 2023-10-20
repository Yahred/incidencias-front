import { FC, useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import ContenedorFormularioC from '../../../components/ContenedorFormulario';
import FormField from '../../../../../components/FormField';

import { CAMPO_REQUERIDO } from '../../../../../constants/validaciones';
import { registrarEdificio } from '../../../../../services/edificios';
import { Edificio } from '../../../../../interfaces/Edificio';
import { obtenerDepartamentos } from '@services';
import FormSelect from '@components/FormSelect';

const edificioSchema = yup.object({
  nombre: yup.string().required(CAMPO_REQUERIDO),
  descripcion: yup.string(),
  departamento: yup.string().required(CAMPO_REQUERIDO),
})

const EdificioFormulario: FC = () => {
  const methods = useForm({
    resolver: yupResolver(edificioSchema),
  });

  const { data: departamentos } = useQuery({
    queryKey: 'departamentos',
    queryFn: obtenerDepartamentos,
    initialData: [],
  })

  const { mutateAsync } = useMutation({
    mutationKey: 'edificio',
    mutationFn: registrarEdificio
  });

  const guardar = useCallback(async (edificio: Edificio) => {
    await mutateAsync(edificio)
  }, [mutateAsync]);

  return (
    <ContenedorFormularioC
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
      <FormSelect
        name='departamento'
        title="Departamento"
        subtitle="Departamento al que pertenece el edificio"
        options={departamentos!}
        required
      />
    </ContenedorFormularioC>
  );
};

export default EdificioFormulario;
