import { TiposUsuario } from "../constants/tiposUsuario";

export interface TipoUsuario {
  id: TiposUsuario;
  nombre: string;
  clave?: string;
  modulos?: string[];
  activo?: boolean;
  accionesTablero?: string[];
}
