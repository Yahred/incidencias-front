export interface TipoUsuario {
  id: string;
  nombre: string;
  clave?: string;
  modulos?: string[];
  activo?: boolean;
  accionesTablero?: string[];
}
