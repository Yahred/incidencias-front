export enum EstatusEnum {
  Pendiente = 'PENDIENTE',
  Aprobada = 'APROBADA',
  EnProceso = 'EN_PROCESO',
  Terminada = 'TERMINADA',
  Validado = 'VALIDADO',
}

export const ESTATUS_NOMBRES = {
  [EstatusEnum.Aprobada]: 'Incidencias aprobadas',
  [EstatusEnum.EnProceso]: 'Incidencias en proceso',
  [EstatusEnum.Pendiente]: 'Incidencias pendientes',
  [EstatusEnum.Terminada]: 'Incidencias terminadas',
  [EstatusEnum.Validado]: 'Incidencias validadas',
};
