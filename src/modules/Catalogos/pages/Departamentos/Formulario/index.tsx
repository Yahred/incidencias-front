import { FC, useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import ContenedorFormularioC from '../../../components/ContenedorFormulario';
import FormField from '../../../../../components/FormField';

import { CAMPO_REQUERIDO } from '../../../../../constants/validaciones';

import useFormSetEffect from '../../../../../utils/hooks/useSetForm';
import { useParams } from 'react-router-dom';
import {
  obtenerDepartamentoPorId,
  registrarDepartamento,
} from '../../../../../services/departamentos';
import { Departamento } from '../../../../../interfaces/Departamento';

const areaSchema = yup.object({
  nombre: yup.string().required(CAMPO_REQUERIDO),
  descripcion: yup.string(),
});

const CategoriaFormulario: FC = () => {
  const { id } = useParams();

  const methods = useForm({
    resolver: yupResolver(areaSchema),
  });

  const { data: departamento } = useQuery({
    queryFn: () => obtenerDepartamentoPorId(id!),
    enabled: !!id,
    initialData: null,
  });

  const { mutateAsync } = useMutation({
    mutationKey: 'categoria',
    mutationFn: (departamento: Departamento) =>
      registrarDepartamento(departamento, id),
  });

  const guardar = useCallback(
    async (departamento: Departamento) => {
      await mutateAsync(departamento);
    },
    [mutateAsync]
  );

  useFormSetEffect(departamento, methods.setValue);

  return (
    <ContenedorFormularioC
      title="Registro del departamentos"
      subtitle="Da de alta un nuevo departamento en el sistema"
      methods={methods}
      onSubmit={guardar}
    >
      <FormField
        name="nombre"
        title="Nombre"
        subtitle="Nombre del departamento"
        required
      />
      <FormField
        name="descripcion"
        title="Descripción"
        subtitle="Descripción sobre el departamentos"
      />
    </ContenedorFormularioC>
  );
};

export default CategoriaFormulario;
