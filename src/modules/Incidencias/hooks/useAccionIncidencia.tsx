import { useMemo } from 'react';

import { useMutation } from 'react-query';

import AsignacionPrioridad from '../components/AsignacionPrioridad';
import Diagnostico from '@components/incidencias/Diagnostico';
import SolicitudCambio from '@components/incidencias/SolicitudCambio';
import SubmitButton from '@components/formularios/SubmitButton';

import useAsignarTecnico from './useAsignarTecnico';
import { EstatusEnum } from '@constants/estatus';
import { Incidencia } from '@interfaces/Incidencia';
import { aprobarIncidenciaPorId, asignarTecnicoPorId } from '@services';
import { Usuario } from '@interfaces/Usuario';
import { PrioridadesEnum } from '@constants/prioridades';

const useAccionIncidencia = (
  incidencia: Incidencia | null,
  onChange: () => void
) => {
  const {
    isDrawerOpen: isAsignarTecnicoOpen,
    cerrarDrawer: cerrarAsignarTecnico,
    abrirDrawer,
  } = useAsignarTecnico();

  const { mutate: aprobar } = useMutation({
    mutationKey: ['aprobar', incidencia?.id],
    mutationFn: (prioridad: PrioridadesEnum) =>
      aprobarIncidenciaPorId(incidencia!.id!, prioridad),
    onSuccess: onChange,
  });

  const { mutate: asignarTecnico } = useMutation({
    mutationKey: ['asignarTecnico', incidencia?.id],
    mutationFn: (tecnico: Usuario) =>
      asignarTecnicoPorId(incidencia!.id!, tecnico.id!),
    onSuccess: () => {
      cerrarAsignarTecnico();
      onChange();
    },
  });

  const accionPorEstatus = useMemo(
    () => ({
      [EstatusEnum.Pendiente]: (
        <AsignacionPrioridad onAsignarPrioridad={aprobar} />
      ),
      [EstatusEnum.Aprobada]: (
        <SubmitButton onClick={abrirDrawer}>Asignar técnico</SubmitButton>
      ),
      [EstatusEnum.EnProceso]: (
        <>
          {incidencia?.cambio && (
            <SolicitudCambio
              incidencia={incidencia!}
              accion={incidencia?.cambio?.estatus === EstatusEnum.Solicitado}
              onAprobarCambio={onChange}
              soloConsulta
            />
          )}
          {incidencia?.diagnostico && (
            <Diagnostico incidencia={incidencia} soloConsulta />
          )}
        </>
      ),
    }),
    [aprobar, abrirDrawer, incidencia, onChange]
  );

  return {
    accionPorEstatus,
    isAsignarTecnicoOpen,
    asignarTecnico,
    cerrarAsignarTecnico,
  };
};

export default useAccionIncidencia;
