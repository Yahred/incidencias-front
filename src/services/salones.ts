import axios from '../config/axios';
import { SALONES, obtenerPaginado, param } from '../constants/uris';
import { Paginado } from '../interfaces/Paginado';
import { Salon } from '../interfaces/Salon';

export const obtenerSalonesPaginado = (q: string, pagina?: string) =>
  axios.get<unknown, Paginado<Salon>>(obtenerPaginado(SALONES), {
    params: {
      q,
      pagina,
    },
  });

export const obtenerSalonPorId = (id: string) =>
  axios.get<unknown, Salon>(param(SALONES, id));

export const registrarSalon = (salon: Salon, id?: string) =>
  id ? axios.put(param(SALONES, id), salon) : axios.post(SALONES, salon);

export const obtenerSalones = (edificio?: string) =>
  axios.get<unknown, Salon[]>(SALONES, {
    params: {
      edificio,
    },
  });

export const eliminarSalon = (id: string) => axios.delete(param(SALONES, id));
