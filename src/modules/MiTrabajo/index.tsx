import { FC, useCallback, useMemo } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';

import ModalIncidencia from '@components/incidencias/ModalIncidencia';
import SliderIncidencias from '@components/incidencias/SliderIncidencias';
import SubmitButton from '@components/formularios/SubmitButton';
import TabsIncidencias from './components/TabsIncidencias';
import ModalReportar from './components/ModalReportar';
import Diagnostico from '../../components/incidencias/Diagnostico';
import ModalCalificarTecnico from './components/ModalCalificarTecnico';
import SolicitudCambio from '../../components/incidencias/SolicitudCambio';

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
import { CambioRecurso } from '../../interfaces';

const MiTrabajo: FC = () => {
  const usuario = useSesion();

  const esTecnicoOJefe = useMemo(
    () =>
      [TiposUsuario.Tecnico, TiposUsuario.JefeDeTaller].includes(
        (usuario?.tipoUsuario as TipoUsuario)?.id
      ),
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
  } = useMisIncidencias(esTecnicoOJefe);

  const handleFinalizarIncidencia = useCallback(async () => {
    const response = await finalizarIncidenciaMut();
    if (response) {
      setIncidenciaSeleccionada((prev) => ({
        ...prev!,
        estatus: response.estatus,
      }));
      refetch();
      cerrarModalIncidencia();
    }
  }, [
    finalizarIncidenciaMut,
    setIncidenciaSeleccionada,
    refetch,
    cerrarModalIncidencia,
  ]);

  const handleDiagnostico = useCallback(
    (data: Incidencia) => {
      setIncidenciaSeleccionada((prev) => ({
        ...prev,
        ...data,
      }));
      refetch();
    },
    [refetch, setIncidenciaSeleccionada]
  );

  const handleSolicitarCambio = useCallback(
    (cambio: CambioRecurso) => {
      setIncidenciaSeleccionada((prev) => ({ ...prev!, cambio }));
      refetch();
    },
    [refetch, setIncidenciaSeleccionada]
  );

  const guardarIncidencia = useCallback(
    async (data: Incidencia) => {
      await reportarIncidenciaMut(data);
      cerrarModalReportar();
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
        cerrarModalIncidencia();
      }
    },
    [
      validarIncidenciaMut,
      setIncidenciaSeleccionada,
      refetch,
      cerrarModalIncidencia,
    ]
  );

  const handleItemIncidenciaClick = useCallback(
    (incidencia: Incidencia) => {
      abrirModalIncidencia(incidencia);
    },
    [abrirModalIncidencia]
  );

  const sePuedeFinalizarIncidencia = useMemo<boolean>(() => {
    if (!esTecnicoOJefe) return false;

    if (incidenciaSeleccionada?.estatus.id === EstatusEnum.Terminada)
      return false;

    if (incidenciaSeleccionada?.cambio?.estatus !== EstatusEnum.Aprobado)
      return false;

    if (!incidenciaSeleccionada.diagnostico && !incidenciaSeleccionada.cambio)
      return false;

    return true;
  }, [incidenciaSeleccionada, esTecnicoOJefe]);

  const sePuedeSolicitarCambio = useMemo<boolean>(() => {
    if (
      (incidenciaSeleccionada?.estatus.id !== EstatusEnum.EnProceso &&
      !incidenciaSeleccionada?.cambio) || !incidenciaSeleccionada?.diagnostico
    )
      return false;
    return true;
  }, [incidenciaSeleccionada]);

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
            {esTecnicoOJefe && (
              <>
                {sePuedeSolicitarCambio && (
                  <SolicitudCambio
                    incidencia={incidenciaSeleccionada!}
                    onSolicitarCambio={handleSolicitarCambio}
                    soloConsulta={!!incidenciaSeleccionada?.cambio}
                  />
                )}
                {(!incidenciaSeleccionada?.cambio || incidenciaSeleccionada.diagnostico) && (
                  <Diagnostico
                    incidencia={incidenciaSeleccionada}
                    onDiagnosticoAsignado={handleDiagnostico}
                    soloConsulta={!!incidenciaSeleccionada?.diagnostico}
                  />
                )}
              </>
            )}
            {sePuedeFinalizarIncidencia && (
              <SubmitButton onClick={handleFinalizarIncidencia} color="success">
                Finalizar incidencia
              </SubmitButton>
            )}
            {!esTecnicoOJefe &&
              incidenciaSeleccionada?.estatus.id === EstatusEnum.Terminada && (
                <SubmitButton onClick={abrirModalCalificar}>
                  Validar incidencia
                </SubmitButton>
              )}
          </>
        }
      />
      {!esTecnicoOJefe &&
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
