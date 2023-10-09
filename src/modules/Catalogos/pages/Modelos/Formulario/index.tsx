import { FC, useCallback, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useMutation, useQueries, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Box from '@mui/material/Box';

import ContenedorFormulario from '../../../components/ContenedorFormulario';
import FormField from '../../../../../components/FormField';
import FormSelect from '../../../../../components/FormSelect';
import FormFile from '../../../../../components/FormFile';
import FormularioCaracteristicasModelo from '../../../components/FormularioCaracteristicasModelo';

import objectToFormData from '../../../../../utils/functions/objectToFormData';
import useFormSetEffect from '../../../../../utils/hooks/useSetForm';
import { CAMPO_REQUERIDO } from '../../../../../constants/validaciones';
import { obtenerAreas, obtenerCategoriaPorId, obtenerCategorias } from '../../../services';
import { CaracteristicaModelo, Modelo } from '../../../../../interfaces/Modelo';
import { obtenerModeloPorId, registrarModelo } from '../../../services/modelos';
import { useParams } from 'react-router-dom';

const modeloSchema = yup.object({
  nombre: yup.string().required(CAMPO_REQUERIDO),
  descripcion: yup.string(),
  categoria: yup.string().required(CAMPO_REQUERIDO),
  imagen: yup.mixed(),
  area: yup.string().required(CAMPO_REQUERIDO),
});

const ModeloFormulario: FC = () => {
  const { id } = useParams();

  const methods = useForm({
    resolver: yupResolver(modeloSchema),
  });

  const areaSeleccionada = methods.watch('area');
  const categoriaSeleccionada = methods.watch('categoria');

  const [caracteristicasModelo, setCaracteristicasModelo] = useState<CaracteristicaModelo[]>([]);

  const [{ data: areas }, { data: modelo }] = useQueries([
    {
      queryKey: 'areas',
      queryFn: obtenerAreas,
      initialData: [],
    },
    {
      queryKey: ['modelo', id],
      queryFn: () => obtenerModeloPorId(id!),
      enabled: !!id,
    }
  ]);

  const { data: categorias } = useQuery({
    queryKey: ['categorias', areaSeleccionada],
    queryFn: () => obtenerCategorias(areaSeleccionada),
    initialData: [],
    enabled: !!areaSeleccionada,
  });

  const { data: categoria } = useQuery({
    queryKey: ['categoria', categoriaSeleccionada],
    queryFn: () => obtenerCategoriaPorId(categoriaSeleccionada),
    staleTime: 0,
    enabled: !!categoriaSeleccionada,
  });

  const { mutateAsync } = useMutation({
    mutationKey: 'salon',
    mutationFn: (modelo: FormData) => registrarModelo(modelo, id!)
  });

  const guardar = useCallback(async (modelo: Modelo) => {
    const formData = objectToFormData({ ...modelo, caracteristicas: caracteristicasModelo })
    await mutateAsync(formData)
  }, [mutateAsync, caracteristicasModelo]);

  const handleFormularioCaracteristicasChange = useCallback((c: CaracteristicaModelo[]) => {
    setCaracteristicasModelo(c);
  }, []);

  useEffect(() => {
    if (!id) {
      methods.setValue('categoria', '');
    }
  }, [id, areaSeleccionada, methods]);

  useEffect(() => {
    if (!id) setCaracteristicasModelo([]);
  }, [categoriaSeleccionada, id, modelo?.categoria]);

  useEffect(() => {
    if (!id) return;
    setCaracteristicasModelo(modelo?.caracteristicas || []);
  }, [id, modelo]);

  useFormSetEffect(modelo, methods.setValue);

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
        disabled={!!id}
        required
      />
      <FormFile
        name='imagen'
        title='Imagen'
        subtitle='Imagen representativa del modelo'
        previewSrc={modelo?.imagen}
        showPreview
      />
      <FormSelect
        name='categoria'
        title='Categoría'
        subtitle='Selecciona la categoría a la que pertenece el modelo'
        options={categorias!}
        disabled={!areaSeleccionada || !!id}
        required
      />
      <Box />
      <FormularioCaracteristicasModelo
        caracteristicas={categoria?.caracteristicas || []}
        onChange={handleFormularioCaracteristicasChange}
        value={caracteristicasModelo}
      />
    </ContenedorFormulario>
  );
};

export default ModeloFormulario;
