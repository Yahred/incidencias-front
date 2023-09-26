import { FC, useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import ContenedorFormulario from '../../../components/ContenedorFormulario';
import FormField from '../../../../../components/FormField';
import FormSelect from '../../../../../components/FormSelect';

import { CAMPO_REQUERIDO } from '../../../../../constants/validaciones';
import { registrarSalon } from '../../../services/salones';
import { Salon } from '../../../../../interfaces/Salon';
import { obtenerAreas, obtenerCategoriaPorId, obtenerCategorias } from '../../../services';

const modeloSchema = yup.object({
  nombre: yup.string().required(CAMPO_REQUERIDO),
  descripcion: yup.string(),
  categoria: yup.string().required(CAMPO_REQUERIDO),
  area: yup.string().required(CAMPO_REQUERIDO),
})

const ModeloFormulario: FC = () => {
  const methods = useForm({
    resolver: yupResolver(modeloSchema),
  });
  const areaSeleccionada = methods.watch('area');
  const categoriaSeleccionada = methods.watch('categoria');
  console.log('area', areaSeleccionada);

  const { data: areas } = useQuery({
    queryKey: 'areas',
    queryFn: obtenerAreas,
    initialData: [],
  });

  const { data: categorias } = useQuery({
    queryKey: ['categorias', areaSeleccionada],
    queryFn: () => obtenerCategorias(areaSeleccionada),
    initialData: [],
    enabled: !!areaSeleccionada,
  });

  const { data: categoria } = useQuery({
    queryKey: ['caracteristicas', categoriaSeleccionada],
    queryFn: () => obtenerCategoriaPorId(categoriaSeleccionada),
  });

  const { mutateAsync } = useMutation({
    mutationKey: 'salon',
    mutationFn: registrarSalon
  });

  const guardar = useCallback(async (salon: Salon) => {
    await mutateAsync(salon)
  }, [mutateAsync]);

  return (
    <ContenedorFormulario
      title="Registro de modelo"
      subtitle="Da de alta un nuevo modelo en el sistema"
      methods={methods}
      onSubmit={guardar}
    >
      <FormField
        name="nombre"
        title="Nombre"
        subtitle="Nombre del modelo"
        required
      />
      <FormField
        name="descripcion"
        title="Descripcion"
        subtitle="Descripcion sobre el modelo"
      />
      <FormSelect
        name='area'
        title='Área'
        subtitle='Selecciona el área a la que pertenece el modelo'
        options={areas!}
        required
      />
      <FormSelect
        name='categoria'
        title='Categoría'
        subtitle='Selecciona la categoría a la que pertenece el modelo'
        options={categorias!}
        disabled={!areaSeleccionada}
        required
      />
    </ContenedorFormulario>

  );
};

export default ModeloFormulario;
