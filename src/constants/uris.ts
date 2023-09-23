export const USUARIOS = '/usuarios';
export const PAGINADO = '/paginado';

export const obtenerPaginado = (uri: string) => `${uri}${PAGINADO}`;
