import axios from '../../../config/axios';
import { USUARIOS, obtenerPaginado } from '../../../constants/uris';
import { Paginado } from '../../../interfaces/Paginado';
import { Usuario } from '../../../interfaces/Usuario';

export const obtenerUsuarios = (q: string) =>
  axios.get<unknown, Paginado<Usuario>>(obtenerPaginado(USUARIOS), {
    params: {
      q,
    }
  });
