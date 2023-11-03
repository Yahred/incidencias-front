import { useMemo } from 'react';

import SubmitButton from '@components/SubmitButton';

import useAsignarTecnico from './useAsignarTecnico';
import { EstatusEnum } from '@constants/estatus';
import { Incidencia } from '@interfaces/Incidencia';
import { useMutation } from 'react-query';
import { aprobarIncidenciaPorId, asignarTecnicoPorId } from '../../../services';
import { Usuario } from '@interfaces/index';

const useAccionIncidencia = (incidencia: Incidencia | null, onChange: () => void) => {
  const { isDrawerOpen: isAsignarTecnicoOpen, abrirDrawer, cerrarDrawer: cerrarAsignarTecnico } = useAsignarTecnico();

  const { mutate: aprobar } = useMutation({
    mutationKey: ['aprobar', incidencia?.id],
    mutationFn: () => aprobarIncidenciaPorId(incidencia!.id!),
    onSuccess: onChange,
  });

  const { mutate: asignarTecnico } = useMutation({
    mutationKey: ['asignarTecnico', incidencia?.id],
    mutationFn: (tecnico: Usuario) => asignarTecnicoPorId(incidencia!.id!, tecnico.id!),
    onSuccess: () => {
      cerrarAsignarTecnico()
      onChange()
    },
  })

  const accionPorEstatus = useMemo(() => ({
    [EstatusEnum.Pendiente]: <SubmitButton onClick={aprobar}>Aprobar Incidencia</SubmitButton>,
    [EstatusEnum.Aprobada] : <SubmitButton onClick={abrirDrawer}>Asignar técnico</SubmitButton>,
    [EstatusEnum.EnProceso]: <SubmitButton>Finalizar</SubmitButton>,
    [EstatusEnum.Terminada]: <SubmitButton>Validar</SubmitButton>,
  }), [aprobar, abrirDrawer]);

  return {
    accionPorEstatus,
    isAsignarTecnicoOpen,
    asignarTecnico,
    cerrarAsignarTecnico,
  };
};

export default useAccionIncidencia;
