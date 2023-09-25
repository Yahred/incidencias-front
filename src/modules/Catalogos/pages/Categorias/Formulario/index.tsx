import { FC, useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import ContenedorFormulario from '../../../components/ContenedorFormulario';
import FormField from '../../../../../components/FormField';
import FormSelect from '../../../../../components/FormSelect';

import { CAMPO_REQUERIDO } from '../../../../../constants/validaciones';
import { obtenerAreas } from '../../../services/areas';
import { Categoria } from '../../../../../interfaces/Categoria';
import { registrarCategoria } from '../../../services/categorias';

const areaSchema = yup.object({
  nombre: yup.string().required(CAMPO_REQUERIDO),
  descripcion: yup.string(),
  area: yup.string().required(CAMPO_REQUERIDO)
})

const CategoriaFormulario: FC = () => {
  const methods = useForm({
    resolver: yupResolver(areaSchema),
  });

  const { data: areas } = useQuery({
    queryKey: 'areas',
    queryFn: obtenerAreas,
    initialData: []
  })

  const { mutateAsync } = useMutation({
    mutationKey: 'categoria',
    mutationFn: registrarCategoria
  });

  const guardar = useCallback(async (categoria: Categoria) => {
    await mutateAsync(categoria)
  }, [mutateAsync]);

  return (
    <ContenedorFormulario
      title="Registro de categoría"
      subtitle="Da de alta una nueva categoría en el sistema"
      methods={methods}
      onSubmit={guardar}
    >
      <FormField
        name="nombre"
        title="Nombre"
        subtitle="Nombre de la categoría"
        required
      />
      <FormField
        name="descripcion"
        title="Descripcion"
        subtitle="Descripcion sobre la categoría"
      />
      <FormSelect
        name='area'
        title='Área'
        subtitle='Selecciona el área al que pertenece la categoría'
        options={areas!}
      />
    </ContenedorFormulario>
  );
};

export default CategoriaFormulario;
