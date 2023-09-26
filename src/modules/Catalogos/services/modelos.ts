import axios from '../../../config/axios';
import {
  MODELOS,
  obtenerPaginado,
  param,
} from '../../../constants/uris';
import { Paginado } from '../../../interfaces/Paginado';
import { Usuario } from '../../../interfaces/Usuario';

export const obtenerModelosPaginado = (q: string, pagina?: string) =>
  axios.get<unknown, Paginado<Usuario>>(obtenerPaginado(MODELOS), {
    params: {
      q,
      pagina,
    },
  });

export const obtenerModeloPorId = (id: string) =>
  axios.get<unknown, Usuario>(param(MODELOS, id));

export const registrarModelo = (usuario: FormData, id?: string) =>
  id ? axios.put(param(MODELOS, id), usuario, { headers: { "Content-Type": "multipart/form-data" } }) : axios.post(MODELOS, usuario);

export const eliminarModelo = (id: string) =>
  axios.delete(param(MODELOS, id));
