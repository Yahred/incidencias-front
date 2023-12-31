import { FC, useCallback, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useMutation, useQueries } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import ContenedorFormularioC from '../../../components/ContenedorFormulario';
import Form from '../../../../../components/formularios/Form';
import FormField from '@components/formularios/FormField';
import FormSelect from '../../../../../components/formularios/FormSelect';
import Table, { Cabeceros } from '../../../../../components/generales/Table';

import {
  CAMPO_REQUERIDO,
  CARACTERISTICA_REPETIDA,
} from '../../../../../constants/validaciones';
import { obtenerAreas } from '../../../../../services/areas';
import { Caracteristica, Categoria } from '../../../../../interfaces/Categoria';
import {
  obtenerCategoriaPorId,
  registrarCategoria,
} from '../../../../../services/categorias';
import { useParams } from 'react-router-dom';
import useFormSetEffect from '../../../../../utils/hooks/useSetForm';

const areaSchema = yup.object({
  nombre: yup.string().required(CAMPO_REQUERIDO),
  descripcion: yup.string(),
  area: yup.string().required(CAMPO_REQUERIDO),
});

const itemsSelectObligatorio = [
  {
    id: true,
    nombre: 'OBLIGATORIA',
  },
  {
    id: false,
    nombre: 'OPCIONAL',
  },
];

const cabeceros: Cabeceros<Caracteristica>[] = [
  {
    label: 'Nombre',
    key: 'nombre',
  },
  {
    label: 'Unidad',
    key: 'unidad',
  },
  {
    label: 'Obligatoria',
    transform: ({ requerida }) => (requerida ? 'OBLIGATORIA' : 'OPCIONAL'),
  },
];

const CategoriaFormulario: FC = () => {
  const { id } = useParams();

  const [caracteristicas, setCaracteristicas] = useState<Caracteristica[]>([]);

  const methods = useForm({
    resolver: yupResolver(areaSchema),
  });

  const methodsCaracteristicas = useForm();

  const [{ data: areas }, { data: categoria }] = useQueries([
    { queryKey: 'areas', queryFn: obtenerAreas, initialData: [] },
    {
      queryKey: [id],
      queryFn: () => obtenerCategoriaPorId(id!),
      enabled: !!id,
    },
  ]);

  const { mutateAsync } = useMutation({
    mutationKey: 'categoria',
    mutationFn: (categoria: Categoria) => registrarCategoria(categoria, id),
  });

  const agregarCaracteristica = useCallback(
    (caracteristica: Caracteristica) => {
      setCaracteristicas((prev) => [...prev, caracteristica]);
      methodsCaracteristicas.reset();
    },
    [methodsCaracteristicas]
  );

  const validarCaracteristicaRepetida = useCallback(
    (nombre: string) => {
      const repetida = caracteristicas.some(({ nombre: n }) => n === nombre);
      if (repetida) return CARACTERISTICA_REPETIDA;
    },
    [caracteristicas]
  );

  const guardar = useCallback(
    async (categoria: Categoria) => {
      await mutateAsync({ ...categoria, caracteristicas });
    },
    [mutateAsync, caracteristicas]
  );

  useFormSetEffect(categoria, methods.setValue);

  useEffect(() => {
    if (categoria?.caracteristicas)
      setCaracteristicas(categoria?.caracteristicas);
  }, [categoria]);

  return (
    <>
      <ContenedorFormularioC
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
          title="Descripción"
          subtitle="Descripción sobre la categoría"
        />
        <FormSelect
          name="area"
          title="Área"
          subtitle="Selecciona el área al que pertenece la categoría"
          options={areas!}
        />
      </ContenedorFormularioC>
      <Form
        methods={methodsCaracteristicas}
        onSubmit={agregarCaracteristica}
        sx={{
          gridColumn: 'span 2 / span 2',
          gap: 2,
          display: 'grid',
          gridTemplateColumns: {
            lg: 'repeat(3, minmax(0, 1fr))',
            xs: 'repeat(1, minmax(0, 1fr))'
          },
          py: 4,
        }}
      >
        <FormField
          name="nombre"
          title="Característica"
          subtitle="Nombre de la característca"
          rules={{
            validate: validarCaracteristicaRepetida,
            required: CAMPO_REQUERIDO,
          }}
          required
        />
        <FormField
          name="unidad"
          title="Unidad de medida"
          subtitle="Unidad con la que se mide la característica"
        />
        <FormSelect
          name="requerida"
          title="Obligatoria"
          subtitle="Indica si la característica es obligatoria"
          defaultValue={false}
          options={itemsSelectObligatorio}
        />
        <Box
          display="flex"
          justifyContent="flex-end"
          gridColumn={{
            lg: 'span 3 / span 3',
            xs: 'span 1 / span 1'
          }}
        >
          <Button type="submit">Agregar característica</Button>
        </Box>
      </Form>
      <Table cabeceros={cabeceros} rows={caracteristicas} />
    </>
  );
};

export default CategoriaFormulario;
