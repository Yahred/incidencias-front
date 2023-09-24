import { ITEMS_POR_PAGINA } from "./general";

export const USUARIOS = '/usuarios';
export const TIPOS_USUARIO = '/tipos-usuario';
export const PAGINADO = '/paginado';
export const LOGIN = '/login'

export const obtenerPaginado = (uri: string) => `${uri}${PAGINADO}?itemsPorPagina=${ITEMS_POR_PAGINA}`;
