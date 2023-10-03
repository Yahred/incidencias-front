import axios from "../config/axios";
import { INCIDENCIAS } from "../constants/uris";
import { Incidencia } from "../interfaces/Incidencia";

export const registrarIncidencia = (incidencia: FormData) => axios.post(INCIDENCIAS, incidencia, {
  headers: {
    'Content-Type': 'multipart/form-data'
  },
});

export const obtenerIncidenciasDelUsuario = (fechaInicio?: Date) => axios.get<unknown, Incidencia[]>(INCIDENCIAS, {
  params: {
    usuarioCreacion: true,
    fechaInicio,
  }
});
