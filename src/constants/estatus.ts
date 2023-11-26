export enum EstatusEnum {
  Pendiente = 'PENDIENTE',
  Aprobada = 'APROBADA',
  EnProceso = 'EN_PROCESO',
  Terminada = 'TERMINADA',
  Validado = 'VALIDADO',
  Rechazada = 'RECHAZADA',
}

export const ESTATUS_NOMBRES = {
  [EstatusEnum.Aprobada]: 'Aprobadas',
  [EstatusEnum.EnProceso]: 'En proceso',
  [EstatusEnum.Pendiente]: 'Pendientes',
  [EstatusEnum.Terminada]: 'Terminadas',
  [EstatusEnum.Validado]: 'Validadas',
  [EstatusEnum.Rechazada]: 'Rechazadas',
};
