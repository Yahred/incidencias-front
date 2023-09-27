import axios from '../../../config/axios';
import { MODELOS, obtenerPaginado, param } from '../../../constants/uris';
import { Modelo } from '../../../interfaces/Modelo';
import { Paginado } from '../../../interfaces/Paginado';

export const obtenerModelosPaginado = (q: string, pagina?: string) =>
  axios.get<unknown, Paginado<Modelo>>(obtenerPaginado(MODELOS), {
    params: {
      q,
      pagina,
    },
  });

export const obtenerModeloPorId = (id: string) =>
  axios.get<unknown, Modelo>(param(MODELOS, id));

export const registrarModelo = (modelo: FormData, id?: string) =>
  id
    ? axios.put(param(MODELOS, id), modelo, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    : axios.post(MODELOS, modelo, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

export const eliminarModelo = (id: string) => axios.delete(param(MODELOS, id));
