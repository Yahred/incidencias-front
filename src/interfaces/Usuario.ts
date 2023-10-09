import { Departamento } from "./Departamento";
import { TipoUsuario } from "./TipoUsuario";

export interface Usuario {
  username: string;
  password: string;
  nombres: string;
  apellidoPat: string;
  apellidoMat: string;
  email: string;
  avatar?: string;
  departamento: Departamento;
  tipoUsuario: TipoUsuario | string
}
