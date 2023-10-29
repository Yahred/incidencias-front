import axios from '../config/axios';
import { EstatusEnum } from '../constants/estatus';
import { ESTATUS, INCIDENCIAS, param } from '../constants/uris';
import { Incidencia } from '../interfaces/Incidencia';

export const registrarIncidencia = (incidencia: FormData) =>
  axios.post(INCIDENCIAS, incidencia, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const obtenerIncidenciasDelUsuario = (fechaInicio?: Date) =>
  axios.get<unknown, Incidencia[]>(INCIDENCIAS, {
    params: {
      usuarioCreacion: true,
      fechaInicio,
    },
  });

export const aprobarIncidenciaPorId = (id: string) =>
  axios.put(param(INCIDENCIAS, id, ESTATUS, EstatusEnum.Aprobada));

export const obtenerIncidencias = () =>
  axios.get<unknown, Incidencia[]>(INCIDENCIAS);
