import { FC, useCallback, useMemo, useState } from 'react';

import sub from 'date-fns/sub';
import { useMutation, useQuery } from 'react-query';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ModalIncidencia from '@components/ModalIncidencia';
import SliderIncidencias from '@components/SliderIncidencias';
import TabsIncidencias from './components/TabsIncidencias';
import ModalReportar from './components/ModalReportar';

import objectToFormData from '@functions/objectToFormData';
import { obtenerIncidenciasDelUsuario, registrarIncidencia } from '@services';
import { Incidencia } from '@interfaces/Incidencia';

const MiTrabajo: FC = () => {
  const [modalAbierto, setModalAbierto] = useState<boolean>(false);
  const [modalIncidenciaAbierto, setModalIncidenciaAbierto] =
    useState<boolean>(false);
  const [incidencia, setIncidencia] = useState<Incidencia | null>(null);

  const fechaInicio = useMemo(() => sub(new Date(), { days: 30 }), []);

  const handleAgregarClick = useCallback(() => {
    setModalAbierto(true);
  }, []);

  const handleCancelarRegistro = useCallback(() => {
    setModalAbierto(false);
  }, []);

  const { mutateAsync } = useMutation({
    mutationKey: 'incidencia',
    mutationFn: (incidencia: FormData) => registrarIncidencia(incidencia),
  });

  const { data: incidencias, refetch } = useQuery({
    queryKey: ['incidencias'],
    queryFn: () => obtenerIncidenciasDelUsuario(fechaInicio),
    initialData: [],
    staleTime: 0,
  });

  const guardarIncidencia = useCallback(
    async (form: Incidencia) => {
      const { evidencias, ...incidencia } = form;
      const formData = objectToFormData(incidencia);
      evidencias?.forEach((evidencia) =>
        formData.append('evidencias', evidencia)
      );
      await mutateAsync(formData);
      refetch();
      setModalAbierto(false);
    },
    [mutateAsync, refetch]
  );

  const handleIncidenciaClick = useCallback((incidencia: Incidencia) => {
    setIncidencia(incidencia);
    setModalIncidenciaAbierto(true);
  }, []);

  const handleCerrarModalIncidencia = useCallback(() => {
    setModalIncidenciaAbierto(false);
  }, []);

  return (
    <>
      <Grid container py={{ lg: 6, xs: 2 }} px={{ lg: 8, xs: 2 }} rowGap={2}>
        <Grid container item xs={12} rowGap={2}>
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Typography variant="h5">Mis incidencias</Typography>
            <Button
              onClick={handleAgregarClick}
              color="error"
              sx={{ color: 'white' }}
            >
              Reportar
            </Button>
          </Grid>
          <Grid item xs={12}>
            <SliderIncidencias
              incidencias={incidencias!}
              onClick={handleIncidenciaClick}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TabsIncidencias />
        </Grid>
      </Grid>
      <ModalReportar
        open={modalAbierto}
        onCancel={handleCancelarRegistro}
        onSave={guardarIncidencia}
      />
      <ModalIncidencia
        incidencia={incidencia}
        isOpen={modalIncidenciaAbierto}
        onCerrar={handleCerrarModalIncidencia}
      />
    </>
  );
};

export default MiTrabajo;
