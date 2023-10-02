import { FC, useCallback, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Dialogo from '../../../../components/Dialogo';
import FormField from '../../../../components/FormField';
import Form from '../../../../components/Form';
import FormSelect from '../../../../components/FormSelect';
import ListaImagenes from '../../../../components/ListaImagenes';
import SubmitButton from '../../../../components/SubmitButton';

import {
  obtenerEdicios,
  obtenerRecursos,
  obtenerSalones,
} from '../../../Catalogos/services';
import { Incidencia } from '../../../../interfaces/Incidencia';
import { CAMPO_REQUERIDO } from '../../../../constants/validaciones';

interface ModalReportarProps {
  open: boolean;
  onCancel: () => void;
  onSave: (incidencia: Incidencia) => Promise<void> | void;
}

type ListaEvidencia = (File | string)[];

const incidenciaSchema = yup.object({
  titulo: yup.string().required(CAMPO_REQUERIDO),
  descripcion: yup.string().required(CAMPO_REQUERIDO),
  edificio: yup.string().required(CAMPO_REQUERIDO),
  salon: yup.string().required(CAMPO_REQUERIDO),
  recurso: yup.string().required(CAMPO_REQUERIDO),
});

const ModalReportar: FC<ModalReportarProps> = ({ open, onCancel, onSave }) => {
  const methods = useForm({
    resolver: yupResolver(incidenciaSchema),
  });

  const [listaEvidencia, setListaEvidencia] = useState<ListaEvidencia>([]);

  const edificioSeleccionado = methods.watch('edificio');
  const salonSeleccionado = methods.watch('salon');

  const { data: edificios } = useQuery({
    queryKey: 'edificios',
    queryFn: obtenerEdicios,
    initialData: [],
  });

  const { data: salones } = useQuery({
    queryKey: ['salones', edificioSeleccionado],
    queryFn: () => obtenerSalones(edificioSeleccionado),
    enabled: !!edificioSeleccionado,
    initialData: [],
  });

  const { data: recursos } = useQuery({
    queryKey: ['recursos', salonSeleccionado],
    queryFn: () => obtenerRecursos(salonSeleccionado),
    enabled: !!salonSeleccionado,
    initialData: [],
  });

  const handleCancelar = useCallback(() => {
    methods.reset();
    onCancel();
    setListaEvidencia([]);
  }, [methods, onCancel]);

  const handleAgregarEvidencia = useCallback((image) => {
    setListaEvidencia((prev) => [...prev, image]);
  }, []);

  const handleEvidenciaRemovida = useCallback((index: number) => {
    setListaEvidencia((prev) => {
      const lista = Object.values({ ...prev, [index]: undefined }).filter((value) => !!value);
      return lista as ListaEvidencia;
    })
  }, []);

  const guardarIncidencia = useCallback(async (incidencia: Incidencia) => {
    onSave({ ...incidencia, ...listaEvidencia  });
    methods.reset();
    setListaEvidencia([]);
  }, [onSave, methods, listaEvidencia]);

  return (
    <Dialogo open={open} fullWidth maxWidth="xl">
      <Form methods={methods} onSubmit={guardarIncidencia}>
        <Box
          px={4}
          minHeight="60svh"
          display="flex"
          flexDirection="column"
          rowGap={8}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            gap={12}
            alignItems="flex-end"
          >
            <Box flexGrow={1}>
              <FormField
                name="titulo"
                flatPlaceholder={(value, onDoubleClick) => (
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    onDoubleClick={onDoubleClick}
                  >
                    {value || 'Escribe el título de la incidencia aquí...'}
                  </Typography>
                )}
                flat
              />
            </Box>
            <Box display="flex" gap={2}>
              <Button onClick={handleCancelar} sx={{ height: 40 }}>
                Cancelar
              </Button>
              <SubmitButton color="success" sx={{ height: 40 }}>
                Guardar
              </SubmitButton>
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid
              item
              xs={8}
              px={2}
              display="flex"
              flexDirection="column"
              rowGap={4}
            >
              <FormField
                name="descripcion"
                multiline
                rows={3}
                flatPlaceholder={(value, onDoubleClick) => (
                  <Typography variant="h6" onDoubleClick={onDoubleClick}>
                    {value || 'Describe aquí lo que está ocurriendo...'}
                  </Typography>
                )}
                flat
              />
              <ListaImagenes
                title="Adjuntar evidencia"
                images={listaEvidencia}
                onChange={handleAgregarEvidencia}
                onRemoved={handleEvidenciaRemovida}
              />
            </Grid>
            <Grid
              item
              xs={4}
              height="100%"
              display="flex"
              flexDirection="column"
              rowGap={2}
              px={4}
              sx={{ borderLeft: 4, borderColor: 'primary.main' }}
            >
              <Typography variant="h6">Detalle de la incidencia</Typography>
              <FormSelect
                name="edificio"
                title="Edificio"
                options={edificios!}
              />
              <FormSelect name="salon" title="Salón" options={salones!} />
              <FormSelect name="recurso" title="Recurso" options={recursos!} />
            </Grid>
          </Grid>
        </Box>
      </Form>
    </Dialogo>
  );
};

export default ModalReportar;
