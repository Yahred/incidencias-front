import axios from '../../../config/axios';
import { CATEGORIAS, obtenerPaginado, param } from '../../../constants/uris';
import { Categoria } from '../../../interfaces/Categoria';
import { Paginado } from '../../../interfaces/Paginado';

export const obtenerCategoriasPaginado = (q: string, pagina?: string) =>
  axios.get<unknown, Paginado<Categoria>>(obtenerPaginado(CATEGORIAS), {
    params: {
      q,
      pagina,
    },
  });

export const obtenerCategorias = () =>
  axios.get<unknown, Categoria[]>(CATEGORIAS);

export const obtenerCategoriaPorId = (id: string) =>
  axios.get<unknown, Categoria>(param(CATEGORIAS, id));

export const registrarCategoria = (categoria: Categoria, id?: string) =>
  id ? axios.put(param(CATEGORIAS, id)) : axios.post(CATEGORIAS, categoria);

export const eliminarCategoria = (id: string) =>
  axios.delete(param(CATEGORIAS, id));
