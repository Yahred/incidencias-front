import { Departamento } from '.';
import { Edificio } from './Edificio';
import { Estatus } from './Estatus';
import { Recurso } from './Recurso';
import { Salon } from './Salon';
import { Usuario } from './Usuario';

export interface Incidencia {
  id?: string;
  folio: string;
  titulo: string;
  departamento: Departamento;
  descripcion: string;
  edificio: Edificio ;
  salon: Salon;
  recurso: Recurso;
  evidencias?: (string | File)[];
  atiende?: Usuario;
  estatus: Estatus;
  usuarioCreacion: Usuario;
}
