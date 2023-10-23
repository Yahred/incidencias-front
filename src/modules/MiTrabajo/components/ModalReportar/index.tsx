import { CSSProperties, FC, useCallback, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Dialogo from '@components/Dialogo';
import FormField from '@components/FormField';
import Form from '@components/Form';
import FormSelect from '@components/FormSelect';
import ListaImagenes from '@components/ListaImagenes';
import SubmitButton from '@components/SubmitButton';

import { obtenerEdicios, obtenerRecursos, obtenerSalones } from '@services';
import { Incidencia } from '@interfaces/Incidencia';
import { CAMPO_REQUERIDO } from '@constants/validaciones';
import DialogoConfirmacion from '@components/DialogoConfirmacion';
import { Usuario } from '@interfaces/Usuario';
import useSesion from '../../../../stores/hooks/useSesion';
import TextField from '../../../../components/TextField';

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
  departamento: yup.string().required(),
});

const flatFormFieldMixin: CSSProperties = {
  fontSize: 22,
  fontWeight: 'bold',
};

const ModalReportar: FC<ModalReportarProps> = ({ open, onCancel, onSave }) => {
  const usuario = useSesion() as Usuario;
  console.log(usuario);

  const methods = useForm({
    resolver: yupResolver(incidenciaSchema),
    defaultValues: {
      departamento: usuario.departamento?.id,
    },
  });

  const [listaEvidencia, setListaEvidencia] = useState<ListaEvidencia>([]);
  const [confirmacion, setConfirmacionOpen] = useState<boolean>(false);

  const edificioSeleccionado = methods.watch('edificio');
  const salonSeleccionado = methods.watch('salon');

  const { data: edificios } = useQuery({
    queryKey: 'edificios',
    queryFn: () => obtenerEdicios(usuario.departamento?.id),
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
    const {
      formState: { isDirty },
    } = methods;

    if (isDirty) setConfirmacionOpen(true);
    else {
      methods.reset();
      onCancel();
      setListaEvidencia([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.formState.isDirty]);

  const handleAgregarEvidencia = useCallback((image) => {
    setListaEvidencia((prev) => [...prev, image]);
  }, []);

  const handleEvidenciaRemovida = useCallback((index: number) => {
    setListaEvidencia((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const guardarIncidencia = useCallback(
    async (incidencia: Incidencia) => {
      onSave({ ...incidencia, evidencias: listaEvidencia! });
      methods.reset();
      setListaEvidencia([]);
    },
    [onSave, methods, listaEvidencia]
  );

  const handleConfirmacionCancelar = useCallback(
    (confirmado: boolean) => {
      setConfirmacionOpen(false);
      if (!confirmado) return;
      methods.reset();
      onCancel();
      setListaEvidencia([]);
    },
    [methods, onCancel]
  );

  return (
    <>
      <Dialogo open={open} fullWidth maxWidth="xl">
        <Form methods={methods} onSubmit={guardarIncidencia}>
          <Box
            px={{ md: 4, xs: 2 }}
            pb={{ md: 0, xs: 2  }}
            minHeight="60svh"
            display="flex"
            flexDirection="column"
            rowGap={8}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              gap={{ md: 12, xs: 2 }}
              alignItems="flex-end"
              flexDirection={{ xs: 'column', md: 'row' }}
            >
              <Box flexGrow={{ md: 1 }} width="100%" order={{ xs: 2, md: 1 }}>
                <FormField
                  name="titulo"
                  placeholder="Escribe el título aquí..."
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    sx: flatFormFieldMixin,
                  }}
                />
              </Box>
              <Box display="flex" gap={2} order={{ xs: 1, md: 2 }}>
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
                xs={12}
                md={8}
                px={2}
                display="flex"
                flexDirection="column"
                rowGap={4}
              >
                <FormField
                  name="descripcion"
                  multiline
                  rows={3}
                  placeholder="Describe aquí lo que está ocurriendo..."
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      fontSize: 18,
                    },
                  }}
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
                xs={12}
                md={4}
                height="100%"
                display="flex"
                flexDirection="column"
                rowGap={2}
                px={4}
                sx={{
                  borderLeft: { md: 4, xs: 0 },
                  borderColor: { md: 'primary.main', xs: 'none' },
                }}
              >
                <Typography variant="h6">Detalle de la incidencia</Typography>
                <TextField
                  name="departamento"
                  title="Departamento"
                  value={usuario?.departamento?.nombre}
                  disabled
                />
                <FormSelect
                  name="edificio"
                  title="Edificio"
                  options={edificios!}
                />
                <FormSelect
                  name="salon"
                  title="Salón"
                  options={salones!}
                  disabled={!edificioSeleccionado}
                />
                <FormSelect
                  name="recurso"
                  title="Recurso"
                  options={recursos!}
                  disabled={!salonSeleccionado}
                />
              </Grid>
            </Grid>
          </Box>
        </Form>
      </Dialogo>
      <DialogoConfirmacion
        open={confirmacion}
        onClose={handleConfirmacionCancelar}
      />
    </>
  );
};

export default ModalReportar;
