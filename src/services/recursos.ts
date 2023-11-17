import axios from '../config/axios';
import {
  MODELO,
  RECURSOS,
  obtenerPaginado,
  endpoint,
} from '../constants/uris';
import { Modelo } from '../interfaces';
import { Paginado } from '../interfaces/Paginado';
import { Recurso } from '../interfaces/Recurso';

export const obtenerRecursosPaginado = (q: string, pagina?: string) =>
  axios.get<unknown, Paginado<Recurso>>(obtenerPaginado(RECURSOS), {
    params: {
      q,
      pagina,
    },
  });

export const obtenerRecursos = (salon?: string) =>
  axios.get<unknown, Recurso[]>(RECURSOS, {
    params: {
      salon,
    },
  });

export const obtenerModeloPorRecursoId = (id: string) =>
  axios.get<unknown, Modelo>(endpoint(RECURSOS, id, MODELO));

export const obtenerRecursoPorId = (id: string) =>
  axios.get<unknown, Recurso>(endpoint(RECURSOS, id));

export const registrarRecurso = (recurso: FormData, id?: string) =>
  id
    ? axios.put(endpoint(RECURSOS, id), recurso, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    : axios.post(RECURSOS, recurso, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

export const eliminarRecurso = (id: string) =>
  axios.delete(endpoint(RECURSOS, id));
