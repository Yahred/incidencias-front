import axios from '../config/axios';
import { MODELOS, obtenerPaginado, endpoint } from '../constants/uris';
import { Modelo } from '../interfaces/Modelo';
import { Paginado } from '../interfaces/Paginado';

export const obtenerModelosPaginado = (q: string, pagina?: string) =>
  axios.get<unknown, Paginado<Modelo>>(obtenerPaginado(MODELOS), {
    params: {
      q,
      pagina,
    },
  });

export const obtenerModelos = (categoria?: string) =>
  axios.get<unknown, Modelo[]>(MODELOS, {
    params: {
      categoria,
    },
  });

export const obtenerModeloPorId = (id: string) =>
  axios.get<unknown, Modelo>(endpoint(MODELOS, id));

export const registrarModelo = (modelo: FormData, id?: string) =>
  id
    ? axios.put(endpoint(MODELOS, id), modelo, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    : axios.post(MODELOS, modelo, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

export const eliminarModelo = (id: string) => axios.delete(endpoint(MODELOS, id));
