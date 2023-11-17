import { Usuario } from '.';

export interface Notificacion {
  id: string;
  titulo: string;
  descripcion: string;
  vista: boolean;
  usuarioObjetivo?: Usuario;
}
