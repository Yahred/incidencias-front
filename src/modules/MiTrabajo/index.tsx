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
import Diagnostico from './components/Diagnostico';

import objectToFormData from '@functions/objectToFormData';
import useSesion from '../../stores/hooks/useSesion';
import { obtenerIncidenciasDelUsuario, registrarIncidencia } from '@services';
import { Incidencia } from '@interfaces/Incidencia';
import { TipoUsuario } from '@interfaces/TipoUsuario';
import { TiposUsuario } from '@constants/tiposUsuario';

const MiTrabajo: FC = () => {
  const usuario = useSesion();

  const esTecnico = useMemo(() =>
    (usuario?.tipoUsuario as TipoUsuario)?.id === TiposUsuario.Tecnico
  , [usuario]);

  const [modalAbierto, setModalAbierto] = useState<boolean>(false);
  const [incidencia, setIncidencia] = useState<Incidencia | null>(null);
  const [modalIncidenciaAbierto, setModalIncidenciaAbierto] =
    useState<boolean>(false);

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
    queryKey: ['incidencias', esTecnico],
    queryFn: () => obtenerIncidenciasDelUsuario(fechaInicio, Number(esTecnico)),
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

  const handleDiagnostico = useCallback(() => {
    console.log('dando diagnotiso');
  }, []);

  return (
    <>
      <Grid container py={{ lg: 6, xs: 2 }} px={{ lg: 8, xs: 2 }} rowGap={2}>
        <Grid container item xs={12} rowGap={2}>
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Typography variant="h5">Mis incidencias</Typography>
            {(usuario?.tipoUsuario as TipoUsuario)?.id ===
              TiposUsuario.Academico && (
              <Button onClick={handleAgregarClick}>Reportar</Button>
            )}
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
        open={modalIncidenciaAbierto}
        incidencia={incidencia}
        onCerrar={handleCerrarModalIncidencia}
        accion={
          esTecnico && (
            <Diagnostico onClick={handleDiagnostico} incidencia={incidencia} />
          )
        }
      />
    </>
  );
};

export default MiTrabajo;
