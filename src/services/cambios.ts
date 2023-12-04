import axios from '../config/axios';
import { EstatusEnum } from '../constants/estatus';
import { CAMBIOS, ESTATUS, endpoint } from '../constants/uris';
import { CambioRecurso } from '../interfaces';

export const obtenerCambioPorId = (id: string) =>
  axios.get<never, CambioRecurso>(endpoint(CAMBIOS, id));

export const solicitarCambio = (cambio: CambioRecurso) =>
  axios.post<never, CambioRecurso>(CAMBIOS, cambio);

export const aprobarCambio = (id: string) =>
  axios.put(endpoint(CAMBIOS, id, ESTATUS, EstatusEnum.Aprobado));

export const realizarCambio = (id: string) =>
  axios.put(endpoint(CAMBIOS, id, ESTATUS, EstatusEnum.Realizado));

export const rechazarCambio = (id: string) =>
  axios.put(endpoint(CAMBIOS, id, ESTATUS, EstatusEnum.Rechazado));
