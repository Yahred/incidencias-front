import { Departamento } from '.';
import { TipoUsuario } from './TipoUsuario';

export interface Usuario {
  id?: string;
  username: string;
  password: string;
  nombres: string;
  apellidoPat: string;
  apellidoMat: string;
  email: string;
  avatar?: string;
  departamento: Departamento;
  tipoUsuario: TipoUsuario | string;
}
