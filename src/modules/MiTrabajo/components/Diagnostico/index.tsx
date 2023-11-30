import { FC, useCallback, useMemo, useState } from 'react';

import * as yup from 'yup';
import addHours from 'date-fns/addHours';
import { useQuery, useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { addMinutes, format } from 'date-fns';

import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton, Stack, Typography } from '@mui/material';

import FormSelect from '@components/FormSelect';
import Form from '@components/Form';
import FormField from '@components/FormField';
import SubmitButton from '@components/SubmitButton';

import esDecimal from '@functions/esDecimal';
import { CAMPO_REQUERIDO } from '@constants/validaciones';
import { yupResolver } from '@hookform/resolvers/yup';
import { Incidencia } from '@interfaces/Incidencia';
import { asignarDiagnostico, obtenerServiciosPorRecurso } from '@services';

interface DiagnosticoProps {
  incidencia: Incidencia | null;
  soloConsulta: boolean;
  onDiagnosticoAsignado: (incidencia: Incidencia) => void;
}

const diagnosticoSchema = yup.object({
  diagnostico: yup.string().required(CAMPO_REQUERIDO),
  servicio: yup.string().required(CAMPO_REQUERIDO),
});

const Diagnostico: FC<DiagnosticoProps> = ({
  incidencia,
  onDiagnosticoAsignado,
  soloConsulta,
}) => {
  const form = useForm({
    resolver: yupResolver(diagnosticoSchema),
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const servicioSeleccionado = form.watch('servicio')

  const { data: servicios } = useQuery({
    queryKey: ['servicios', incidencia?.recurso.id],
    queryFn: () => obtenerServiciosPorRecurso(incidencia!.recurso.id!),
    enabled: !!incidencia,
    initialData: [],
  });

  const horaFinalizacionEstimada = useMemo<Date | null>(() => {
    if (!servicioSeleccionado || soloConsulta) return null;
    const servicio = servicios?.find(({ id }) => id === servicioSeleccionado);

    if (!servicio) return null
    const { duracion } = servicio;

    let horaEstimada;
    if (esDecimal(duracion)) {
      horaEstimada = addMinutes(new Date(), duracion * 60);
    } else {
      horaEstimada = addHours(new Date(), duracion || 0);
    }

    return horaEstimada
  }, [servicioSeleccionado, servicios, soloConsulta]);

  const { mutate: mutacionDiagnostico } = useMutation({
    mutationKey: 'dar-diagnostico',
    mutationFn: (diagnostico) =>
      asignarDiagnostico(incidencia!.id!, diagnostico!),
    onSuccess(incidencia: Incidencia) {
      setIsDrawerOpen(false);
      form.reset();
      onDiagnosticoAsignado(incidencia);
    },
  });

  const handleClick = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleCancelar = useCallback(() => {
    setIsDrawerOpen(false);
    form.reset();
  }, [form]);

  return (
    <>
      <SubmitButton onClick={handleClick} type="button">
        {`${soloConsulta ? 'Ver' : 'Dar'} diágnostico`}
      </SubmitButton>
      <Drawer open={isDrawerOpen} anchor='right'>
        <Form methods={form} onSubmit={mutacionDiagnostico}>
          <Stack p={2} direction="row-reverse" justifyContent="space-between">
            <IconButton onClick={handleCancelar}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Grid container px={4} rowGap={2} sx={{ maxWidth: 520 }}>
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <Stack>
                <Typography variant="h5">Folio</Typography>
                <Typography variant="caption">{incidencia?.folio}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                {soloConsulta ? 'Diágnostico' : '¿Cuál es el diágnostico?'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormField
                name="diagnostico"
                rows={4}
                defaultValue={incidencia?.diagnostico}
                disabled={soloConsulta}
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>
                {soloConsulta ? 'Servicio' : 'Selecciona el servicio'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormSelect
                name="servicio"
                defaultValue={incidencia?.servicio as string}
                options={servicios!}
                disabled={soloConsulta}
              />
            </Grid>
            <Grid xs={12}>
              {horaFinalizacionEstimada && <Stack direction="row" alignItems="flex-end" gap={1}>
                  <Typography variant='body1'>Fecha de finalización estimada:</Typography>
                  <Typography variant='caption'>{format(horaFinalizacionEstimada, 'MMM-dd hh:mm a')}</Typography>
                </Stack>}
            </Grid>
            <Grid item xs={12} pt={2}>
              {!soloConsulta && <SubmitButton>Guardar</SubmitButton>}
            </Grid>
          </Grid>
        </Form>
      </Drawer>
    </>
  );
};

export default Diagnostico;
