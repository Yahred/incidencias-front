import axios from '../../../config/axios';
import {
  TIPOS_USUARIO,
  USUARIOS,
  obtenerPaginado,
} from '../../../constants/uris';
import { Paginado } from '../../../interfaces/Paginado';
import { TipoUsuario } from '../../../interfaces/TipoUsuario';
import { Usuario } from '../../../interfaces/Usuario';

export const obtenerUsuarios = (q: string, pagina?: string) =>
  axios.get<unknown, Paginado<Usuario>>(obtenerPaginado(USUARIOS), {
    params: {
      q,
      pagina,
    },
  });

export const registrarUsuario = (usuario: Usuario) =>
  axios.post(USUARIOS, usuario);

export const obtenerTiposUsuario = () =>
  axios.get<unknown, TipoUsuario[]>(TIPOS_USUARIO);
