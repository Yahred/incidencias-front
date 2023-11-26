import axios from '../config/axios';
import { EstatusEnum } from '@constants/estatus';
import {
  DIAGNOSTICO,
  ESTATUS,
  INCIDENCIAS,
  TECNICO,
  VALIDAR,
  endpoint,
} from '@constants/uris';
import { Evaluacion } from '@interfaces/Evaluacion';
import { Incidencia } from '@interfaces/Incidencia';

export const registrarIncidencia = (incidencia: FormData) =>
  axios.post(INCIDENCIAS, incidencia, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const obtenerIncidenciasDelUsuario = ({
  fechaInicio,
  atiende,
  estatus,
}: {
  fechaInicio?: Date;
  atiende?: number;
  estatus?: EstatusEnum;
}) =>
  axios.get<unknown, Incidencia[]>(INCIDENCIAS, {
    params: {
      usuarioCreacion: !atiende,
      fechaInicio,
      atiende,
      estatus,
    },
  });

export const asignarDiagnostico = (
  id: string,
  diagnostico: { diagnostico: string; servicio: string }
) =>
  axios.put<never, Incidencia>(
    endpoint(INCIDENCIAS, id, DIAGNOSTICO),
    diagnostico
  );

export const aprobarIncidenciaPorId = (id: string) =>
  axios.put(endpoint(INCIDENCIAS, id, ESTATUS, EstatusEnum.Aprobada));

export const asignarTecnicoPorId = (id: string, tecnico: string) =>
  axios.put(endpoint(INCIDENCIAS, id, TECNICO, tecnico));

export const obtenerIncidencias = () =>
  axios.get<unknown, Incidencia[]>(INCIDENCIAS);

export const finalizarIncidenciaPorId = (id: string) =>
  axios.put<unknown, Incidencia>(
    endpoint(INCIDENCIAS, id, ESTATUS, EstatusEnum.Terminada)
  );

export const validarIncidenciaPorId = (id: string, evaluacion: Evaluacion) =>
  axios.post<never, { incidencia: Incidencia; evaluacion: Evaluacion }>(
    endpoint(INCIDENCIAS, id, VALIDAR),
    evaluacion
  );
