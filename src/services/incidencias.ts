import axios from "../config/axios";
import { INCIDENCIAS } from "../constants/uris";

export const registrarIncidencia = (incidencia: FormData) => axios.post(INCIDENCIAS, incidencia, {
  headers: {
    'Content-Type': 'multipart/form-data'
  },
});
