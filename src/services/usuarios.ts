import axios from '../config/axios';
import {
  TIPOS_USUARIO,
  USUARIOS,
  obtenerPaginado,
  endpoint,
} from '../constants/uris';
import { Paginado } from '../interfaces/Paginado';
import { TipoUsuario } from '../interfaces/TipoUsuario';
import { Usuario } from '../interfaces/Usuario';

export const obtenerUsuariosPaginado = (q: string, pagina?: string) =>
  axios.get<unknown, Paginado<Usuario>>(obtenerPaginado(USUARIOS), {
    params: {
      q,
      pagina,
    },
  });

export const obtenerUsuarioPorId = (id: string) =>
  axios.get<unknown, Usuario>(endpoint(USUARIOS, id));

export const registrarUsuario = (usuario: FormData, id?: string) =>
  id
    ? axios.put(endpoint(USUARIOS, id), usuario, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    : axios.post(USUARIOS, usuario, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

export const obtenerTiposUsuario = () =>
  axios.get<unknown, TipoUsuario[]>(TIPOS_USUARIO);

export const eliminarUsuario = (id: string) =>
  axios.delete(endpoint(USUARIOS, id));
