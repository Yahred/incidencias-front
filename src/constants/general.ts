export const DEBOUNCE_TIME = 400;
export const ITEMS_POR_PAGINA = 7;

export const MensajesToast = {
  ERROR: 'Ocurrió un error inesperado',
  EXITO: 'Recursos creados correctamente',
  EXITO_ACTUALIZACION: 'Recursos actualizados correctamente',
  EXITO_ELIMINACION: 'Recursos eliminados correctamente',
  CAMPO_DUPLICADO: (campo: string) => `El ${campo} ya existe`,
}

export const MensajesConfirmacion = {
  APROBAR_INCIDENCIA: 'Se aprobará la incidencia'
}

export const MAP_ESTATUS_MENSAJE = {
  201: MensajesToast.EXITO,
  202: MensajesToast.EXITO_ACTUALIZACION,
  204: MensajesToast.EXITO_ELIMINACION,
}
