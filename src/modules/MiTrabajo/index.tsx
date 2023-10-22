import { FC, useCallback, useMemo, useState } from 'react';

import { useMutation, useQuery } from 'react-query';
import sub from 'date-fns/sub';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import TarjetaIncidencia from '@components/TarjetaIncidencia';
import TabsIncidencias from './components/TabsIncidencias';
import ModalReportar from './components/ModalReportar';
import ModalIncidencia from '../../components/ModalIncidencia';

import scrollbarMixin from '../../theme/scrollbar';
import objectToFormData from '@functions/objectToFormData';
import {
  obtenerIncidenciasDelUsuario,
  registrarIncidencia,
} from '@services';
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

  const {
    data: incidencias,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['incidencias'],
    queryFn: () => obtenerIncidenciasDelUsuario(fechaInicio),
    initialData: [],
    staleTime: 0,
  });

  const guardarIncidencia = useCallback(async (form: Incidencia) => {
    const { evidencias, ...incidencia } = form;
    const formData = objectToFormData(incidencia);
    evidencias?.forEach((evidencia) =>
      formData.append('evidencias', evidencia)
    );
    await mutateAsync(formData);
    refetch();
    setModalAbierto(false);
  }, [mutateAsync, refetch]);

  const handleIncidenciaClick = useCallback((incidencia: Incidencia) => {
    setIncidencia(incidencia);
    setModalIncidenciaAbierto(true);
  }, []);

  const handleCerrarModalIncidencia = useCallback(() => {
    setModalIncidenciaAbierto(false);
  }, []);

  return (
    <>
      <Grid container py={6} px={8} rowGap={2}>
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
            <Box
              display="flex"
              gap={3}
              px={1}
              py={4}
              sx={{ overflowX: 'auto', ...scrollbarMixin }}
            >
              {incidencias?.map((incidencia) => (
                <TarjetaIncidencia
                  onClick={handleIncidenciaClick}
                  incidencia={incidencia}
                  isLoading={isLoading}
                />
              ))}
              {!isLoading && !incidencias?.length && (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                >
                  <Typography variant="h4">
                    Aún no has levantado ninguna incidencia
                  </Typography>
                </Box>
              )}
            </Box>
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
