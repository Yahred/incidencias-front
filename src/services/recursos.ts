import axios from '../config/axios';
import { RECURSOS, obtenerPaginado, param } from '../constants/uris';
import { Paginado } from '../interfaces/Paginado';
import { Recurso } from '../interfaces/Recurso';

export const obtenerRecursosPaginado = (q: string, pagina?: string) =>
  axios.get<unknown, Paginado<Recurso>>(obtenerPaginado(RECURSOS), {
    params: {
      q,
      pagina,
    },
  });

export const obtenerRecursos = (salon: string) =>
  axios.get<unknown, Recurso[]>(RECURSOS, {
    params: {
      salon,
    },
  });

export const obtenerRecursoPorId = (id: string) =>
  axios.get<unknown, Recurso>(param(RECURSOS, id));

export const registrarRecurso = (recurso: FormData, id?: string) =>
  id
    ? axios.put(param(RECURSOS, id), recurso, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    : axios.post(RECURSOS, recurso, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

export const eliminarRecurso = (id: string) =>
  axios.delete(param(RECURSOS, id));
