import { Usuario } from '.';

export interface Evaluacion {
  puntualidad: number;
  eficacia: number;
  trato: number;
  tecnico: Usuario | string;
}
