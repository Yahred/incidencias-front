import { ITEMS_POR_PAGINA } from './general';

export const USUARIOS = '/usuarios';
export const TIPOS_USUARIO = '/tipos-usuario';
export const PAGINADO = '/paginado';
export const LOGIN = '/login';
export const EDIFICIOS = '/edificios';
export const SALONES = '/salones';
export const AREAS = '/areas';
export const DEPARTAMENTOS = '/departamentos';
export const CATEGORIAS = '/categorias';
export const MODELOS = '/modelos';
export const MODELO = '/modelo';
export const RECURSOS = '/recursos';
export const INCIDENCIAS = '/incidencias';
export const RENOVAR = '/renovar';
export const REPORTES = '/reportes';
export const CONFIGURACIONES = '/configuraciones';
export const ESTATUS = '/estatus';
export const TECNICOS = '/tecnicos'
export const TECNICO = '/tecnico';
export const SERVICIOS = '/servicios';
export const NOTIFICACIONES = '/notificaciones';
export const DIAGNOSTICO = '/diagnostico';
export const VALIDAR = '/validar';
export const INFO = '/info';

export const obtenerPaginado = (uri: string) =>
  `${uri}${PAGINADO}?itemsPorPagina=${ITEMS_POR_PAGINA}`;

export const endpoint = (uri: string, ...param: (string | number)[]) =>
  `${uri}${param
    .map((res: string | number) =>
      String(res).startsWith('/') ? String(res) : `/${res}`
    )
    .join('')}`;
