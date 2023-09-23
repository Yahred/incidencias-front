export interface TipoUsuario {
  nombre: string;
  clave?: string;
  modulos?: string[];
  activo?: boolean;
  accionesTablero?: string[];
}
