import { FC, useCallback, useMemo, useState } from 'react';

import { useMutation, useQuery } from 'react-query';
import sub from 'date-fns/sub';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import TarjetaIncidencia from './components/TarjetaIncidencia';

import scrollbarMixin from '../../theme/scrollbar';
import TabsIncidencias from './components/TabsIncidencias';
import ModalReportar from './components/ModalReportar';

import objectToFormData from '../../utils/functions/objectToFormData';
import { obtenerIncidenciasDelUsuario, registrarIncidencia } from '../../services/incidencias';
import { Incidencia } from '../../interfaces/Incidencia';
import useStore from '../../stores/store';

const MiTrabajo: FC = () => {
  const isFetching = useStore(({ isFetching }) => isFetching);

  const [modalAbierto, setModalAbierto] = useState<boolean>(false);
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
    queryKey: ['incidencias' ],
    queryFn: () => obtenerIncidenciasDelUsuario(fechaInicio),
    initialData: [],
    staleTime: 0,
  });

  const guardarIncidencia = useCallback(async (form: Incidencia) => {
    const { evidencias, ...incidencia } = form;
    const formData = objectToFormData(incidencia);
    evidencias?.forEach((evidencia) => formData.append('evidencias', evidencia));
    await mutateAsync(formData);
    refetch();
    setModalAbierto(false);
  }, [mutateAsync, refetch]);

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
                <TarjetaIncidencia incidencia={incidencia} isLoading={isFetching} />
              ))}
              {!isFetching && !incidencias?.length && <Box display="flex" alignItems="center" justifyContent="center" width='100%'>
                <Typography variant='h4'>Aún no has levantado ninguna incidencia</Typography>
              </Box>}
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
    </>
  );
};

export default MiTrabajo;
