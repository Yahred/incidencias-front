import axios from '../config/axios';
import { EstatusEnum } from '../constants/estatus';
import { ESTATUS, INCIDENCIAS, TECNICO, endpoint } from '../constants/uris';
import { Incidencia } from '../interfaces/Incidencia';

export const registrarIncidencia = (incidencia: FormData) =>
  axios.post(INCIDENCIAS, incidencia, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const obtenerIncidenciasDelUsuario = (fechaInicio?: Date, atiende?: number) =>
  axios.get<unknown, Incidencia[]>(INCIDENCIAS, {
    params: {
      usuarioCreacion: !atiende,
      fechaInicio,
      atiende,
    },
  });

export const aprobarIncidenciaPorId = (id: string) =>
  axios.put(endpoint(INCIDENCIAS, id, ESTATUS, EstatusEnum.Aprobada));

export const asignarTecnicoPorId = (id: string, tecnico: string) =>
  axios.put(endpoint(INCIDENCIAS, id, TECNICO, tecnico));

export const obtenerIncidencias = () =>
  axios.get<unknown, Incidencia[]>(INCIDENCIAS);
