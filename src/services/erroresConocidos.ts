import axios from '../config/axios';
import { ERRORES_CONOCIDOS, obtenerPaginado, endpoint } from '@constants/uris';
import { ErrorConocido } from '@interfaces/ErrorConocido';
import { Paginado } from '@interfaces/Paginado';

export const obtenerErroresConocidosPaginado = (q: string, pagina?: string) =>
  axios.get<unknown, Paginado<ErrorConocido>>(
    obtenerPaginado(ERRORES_CONOCIDOS),
    {
      params: {
        q,
        pagina,
      },
    }
  );

export const obtenerErroresConocidos = (departamento?: string) =>
  axios.get<unknown, ErrorConocido[]>(ERRORES_CONOCIDOS, {
    params: { departamento },
  });

export const obtenerErrorConocidoPorId = (id: string) =>
  axios.get<never, ErrorConocido>(endpoint(ERRORES_CONOCIDOS, id));

export const registrarErrorConocido = (
  errorConocido: ErrorConocido,
  id?: string
) =>
  id
    ? axios.put(endpoint(ERRORES_CONOCIDOS, id), errorConocido)
    : axios.post(ERRORES_CONOCIDOS, errorConocido);

export const eliminarErrorConocido = (id: string) =>
  axios.delete(endpoint(ERRORES_CONOCIDOS, id));
