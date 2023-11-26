import { FC, useCallback, useMemo } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Fab  from '@mui/material/Fab';

import ModalIncidencia from '@components/ModalIncidencia';
import SliderIncidencias from '@components/SliderIncidencias';
import SubmitButton from '@components/SubmitButton';
import TabsIncidencias from './components/TabsIncidencias';
import ModalReportar from './components/ModalReportar';
import Diagnostico from './components/Diagnostico';
import ModalCalificarTecnico from './components/ModalCalificarTecnico';

import useSesion from '../../stores/hooks/useSesion';
import useEvaluarTecnico from './hooks/useEvaluarTecnico';
import useReportarIncidencia from './hooks/useReportarIncidencia';
import useModalIncidencia from '@hooks/useModalIncidencia';
import useMisIncidencias from './hooks/useMisIncidencias';
import useFinalizarIncidencia from './hooks/useFinalizarIncidencia';
import { Incidencia } from '@interfaces/Incidencia';
import { Evaluacion } from '@interfaces/Evaluacion';
import { TipoUsuario } from '@interfaces/TipoUsuario';
import { TiposUsuario } from '@constants/tiposUsuario';
import { EstatusEnum } from '@constants/estatus';

const MiTrabajo: FC = () => {
  const usuario = useSesion();

  const esTecnico = useMemo(
    () => (usuario?.tipoUsuario as TipoUsuario)?.id === TiposUsuario.Tecnico,
    [usuario]
  );

  const {
    modalAbierto: modalIncidenciaAbierto,
    abrirModal: abrirModalIncidencia,
    cerrarModal: cerrarModalIncidencia,
    incidenciaSeleccionada,
    setIncidenciaSeleccionada,
  } = useModalIncidencia();

  const {
    validarIncidenciaMut,
    modalCalificarAbierto,
    cerrarModalCalificar,
    abrirModalCalificar,
  } = useEvaluarTecnico(incidenciaSeleccionada);

  const {
    modalReportarAbierto,
    abrirModalReportar,
    cerrarModalReportar,
    reportarIncidenciaMut,
  } = useReportarIncidencia();

  const { finalizarIncidenciaMut } = useFinalizarIncidencia(
    incidenciaSeleccionada
  );

  const {
    incidenciasSlider,
    refetch,
    incidenciasTerminadas,
    incidenciasValidadas,
  } = useMisIncidencias(esTecnico);

  const handleFinalizarIncidencia = useCallback(async () => {
    const response = await finalizarIncidenciaMut();
    if (response) {
      refetch();
      setIncidenciaSeleccionada((prev) => ({
        ...prev!,
        estatus: response.estatus,
      }));
    }
  }, [finalizarIncidenciaMut, setIncidenciaSeleccionada, refetch]);

  const handleDiagnostico = useCallback(
    (data: Incidencia) => {
      setIncidenciaSeleccionada((prev) => ({
        ...data,
        ...prev,
      }));
      refetch();
    },
    [refetch, setIncidenciaSeleccionada]
  );

  const guardarIncidencia = useCallback(
    async (data: Incidencia) => {
      await reportarIncidenciaMut(data);
      cerrarModalReportar()
      refetch();
    },
    [reportarIncidenciaMut, refetch, cerrarModalReportar]
  );

  const handleValidarIncidencia = useCallback(
    async (evaluacion: Evaluacion) => {
      const response = await validarIncidenciaMut(evaluacion);
      if (response.incidencia) {
        const { incidencia } = response;
        refetch();
        setIncidenciaSeleccionada((prev) => ({
          ...prev!,
          estatus: incidencia.estatus,
        }));
      }
    },
    [validarIncidenciaMut, setIncidenciaSeleccionada, refetch]
  );

  const handleItemIncidenciaClick = useCallback((incidencia: Incidencia) => {
    abrirModalIncidencia(incidencia)
  }, [abrirModalIncidencia]);

  return (
    <>
      <Grid container py={{ lg: 6, xs: 4 }} px={{ lg: 8, xs: 4 }} rowGap={2}>
        <Grid container item xs={12}>
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Typography variant="h5">Mis incidencias</Typography>
            {(usuario?.tipoUsuario as TipoUsuario)?.id ===
              TiposUsuario.Academico && (
              <Fab
                onClick={abrirModalReportar}
                color="primary"
                variant="extended"
              >
                Reportar
              </Fab>
            )}
          </Grid>
          <Grid item xs={12}>
            <SliderIncidencias
              incidencias={incidenciasSlider!}
              onClick={abrirModalIncidencia}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TabsIncidencias
            incidenciasTerminadas={incidenciasTerminadas}
            incidenciasValidadas={incidenciasValidadas}
            onClick={handleItemIncidenciaClick}
          />
        </Grid>
      </Grid>
      <ModalReportar
        open={modalReportarAbierto}
        onCancel={cerrarModalReportar}
        onSave={guardarIncidencia}
      />
      <ModalIncidencia
        open={modalIncidenciaAbierto}
        incidencia={incidenciaSeleccionada}
        onCerrar={cerrarModalIncidencia}
        accion={
          <>
            {incidenciaSeleccionada?.diagnostico &&
              incidenciaSeleccionada.estatus.id === EstatusEnum.EnProceso && (
                <SubmitButton
                  onClick={handleFinalizarIncidencia}
                  color="success"
                >
                  Finalizar incidencia
                </SubmitButton>
              )}
            {esTecnico && (
              <Diagnostico
                incidencia={incidenciaSeleccionada}
                onDiagnosticoAsignado={handleDiagnostico}
                soloConsulta={!!incidenciaSeleccionada?.diagnostico}
              />
            )}
            {!esTecnico &&
              incidenciaSeleccionada?.estatus.id === EstatusEnum.Terminada && (
                <SubmitButton onClick={abrirModalCalificar}>
                  Validar incidencia
                </SubmitButton>
              )}
          </>
        }
      />
      {!esTecnico &&
        incidenciaSeleccionada?.estatus.id === EstatusEnum.Terminada && (
          <ModalCalificarTecnico
            open={modalCalificarAbierto}
            tecnico={incidenciaSeleccionada.atiende}
            onSubmit={handleValidarIncidencia}
            onClose={cerrarModalCalificar}
          />
        )}
    </>
  );
};

export default MiTrabajo;
