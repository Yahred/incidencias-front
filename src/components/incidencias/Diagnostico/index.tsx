import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import * as yup from 'yup';
import { useQuery, useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { addMinutes, format } from 'date-fns';

import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import FormSelect from '@components/formularios/FormSelect';
import Form from '@components/formularios/Form';
import FormField from '@components/formularios/FormField';
import SubmitButton from '@components/formularios/SubmitButton';

import { CAMPO_REQUERIDO } from '@constants/validaciones';
import { yupResolver } from '@hookform/resolvers/yup';
import { Incidencia } from '@interfaces/Incidencia';
import { asignarDiagnostico, obtenerServiciosPorRecurso } from '@services';
import { Servicio } from '@interfaces/Servicio';

interface DiagnosticoProps {
  incidencia: Incidencia | null;
  soloConsulta: boolean;
  onDiagnosticoAsignado?: (incidencia: Incidencia) => void;
}

type ServiciosPorId = { [key: string]: Servicio }

const diagnosticoSchema = yup.object({
  diagnostico: yup.string().required(CAMPO_REQUERIDO),
  servicios: yup.array().of(yup.string()).required(CAMPO_REQUERIDO),
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

  const serviciosSeleccionados = form.watch('servicios')

  const { data: servicios } = useQuery({
    queryKey: ['servicios', incidencia?.recurso.id],
    queryFn: () => obtenerServiciosPorRecurso(incidencia!.recurso.id!),
    enabled: !!incidencia,
    initialData: [],
  });

  const serviciosPorId = useMemo<ServiciosPorId>(() =>
    servicios?.reduce((acc, servicio) => {
      acc[servicio.id!] = servicio;
      return acc;
    }, {}) as ServiciosPorId,
  [servicios])

  const horaFinalizacionEstimada = useMemo<Date | null>(() => {
    if (soloConsulta || !serviciosSeleccionados) return null

    const horas = serviciosSeleccionados.reduce((acc, servicioId) => {
      if (!serviciosPorId[servicioId!]) return acc;
      const { duracion: d } = serviciosPorId[servicioId!]
      return acc + d;
    }, 0);

    return addMinutes(new Date(), horas * 60);
  }, [serviciosSeleccionados, serviciosPorId, soloConsulta]);

  const { mutate: mutacionDiagnostico } = useMutation({
    mutationKey: 'dar-diagnostico',
    mutationFn: (diagnostico) =>
      asignarDiagnostico(incidencia!.id!, diagnostico!),
    onSuccess(incidencia: Incidencia) {
      setIsDrawerOpen(false);
      form.reset();
      onDiagnosticoAsignado!(incidencia);
    },
  });

  const handleClick = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleCancelar = useCallback(() => {
    setIsDrawerOpen(false);
    form.reset();
  }, [form]);


  useEffect(() => {
    if (incidencia) {
      form.setValue('diagnostico', incidencia.diagnostico);
      form.setValue('servicios', incidencia.servicios as string[] || [])
    }
  }, [incidencia, form])

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
                name="servicios"
                defaultValue={incidencia?.servicios as string[]}
                options={servicios!}
                disabled={soloConsulta}
                multi
              />
            </Grid>
            <Grid item xs={12}>
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

Diagnostico.defaultProps = {
  onDiagnosticoAsignado: () => {}
}

export default Diagnostico;
