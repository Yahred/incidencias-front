import { ITEMS_POR_PAGINA } from "./general";

export const USUARIOS = '/usuarios';
export const TIPOS_USUARIO = '/tipos-usuario';
export const PAGINADO = '/paginado';
export const LOGIN = '/login'
export const EDIFICIOS = '/edificios'
export const SALONES = '/salones';
export const AREAS = '/areas';
export const CATEGORIAS = '/categorias';
export const MODELOS = '/modelos';
export const RECURSOS = '/recursos';
export const INCIDENCIAS = '/incidencias';

export const obtenerPaginado = (uri: string) => `${uri}${PAGINADO}?itemsPorPagina=${ITEMS_POR_PAGINA}`;
export const param = (uri: string, param: string | number) => `${uri}/${param}`;
