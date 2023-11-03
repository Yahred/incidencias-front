import axios from '../config/axios';
import { SERVICIOS, obtenerPaginado, param } from '@constants/uris';
import { Servicio } from '@interfaces/Servicio';
import { Paginado } from '@interfaces/Paginado';

export const obtenerServiciosPaginado = (q: string, pagina?: string) =>
  axios.get<unknown, Paginado<Servicio>>(obtenerPaginado(SERVICIOS), {
    params: {
      q,
      pagina,
    },
  });

export const obtenerServicios = (categoria?: string) =>
  axios.get<unknown, Servicio[]>(SERVICIOS, {
    params: { categoria },
  });

export const obtenerServicioPorId = (id: string) =>
  axios.get<never, Servicio>(param(SERVICIOS, id));

export const registrarServicio = (servicio: Servicio, id?: string) =>
  id
    ? axios.put(param(SERVICIOS, id), servicio)
    : axios.post(SERVICIOS, servicio);

export const eliminarServicio = (id: string) =>
  axios.delete(param(SERVICIOS, id));
