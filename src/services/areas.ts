import axios from '../config/axios';
import { AREAS, obtenerPaginado, param } from '@constants/uris';
import { Area } from '@interfaces/Area';
import { Paginado } from '@interfaces/Paginado';

export const obtenerAreasPaginado = (q: string, pagina?: string) =>
  axios.get<unknown, Paginado<Area>>(obtenerPaginado(AREAS), {
    params: {
      q,
      pagina,
    },
  });

export const obtenerAreaPorId = (id: string) =>
  axios.get<unknown, Area>(param(AREAS, id));

export const obtenerAreas = () => axios.get<unknown, Area[]>(AREAS);

export const registrarArea = (area: Area, id?: string) =>
  id
    ? axios.put<unknown, Area>(param(AREAS, id), area)
    : axios.post<unknown, Area>(AREAS, area);

export const eliminarArea = (id: string) => axios.delete(param(AREAS, id));
