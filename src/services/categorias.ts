import axios from '../config/axios';
import { CATEGORIAS, obtenerPaginado, endpoint } from '../constants/uris';
import { Categoria } from '../interfaces/Categoria';
import { Paginado } from '../interfaces/Paginado';

export const obtenerCategoriasPaginado = (q: string, pagina?: string) =>
  axios.get<unknown, Paginado<Categoria>>(obtenerPaginado(CATEGORIAS), {
    params: {
      q,
      pagina,
    },
  });

export const obtenerCategorias = (area?: string) =>
  axios.get<unknown, Categoria[]>(CATEGORIAS, {
    params: {
      area,
    }
  });

export const obtenerCategoriaPorId = (id: string) =>
  axios.get<unknown, Categoria>(endpoint(CATEGORIAS, id));

export const registrarCategoria = (categoria: Categoria, id?: string) =>
  id ? axios.put(endpoint(CATEGORIAS, id), categoria) : axios.post(CATEGORIAS, categoria);

export const eliminarCategoria = (id: string) =>
  axios.delete(endpoint(CATEGORIAS, id));
