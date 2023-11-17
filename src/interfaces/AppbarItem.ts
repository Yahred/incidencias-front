import { AppbarItems } from '@constants/menu';
import { ISidebarItem } from '.';

export interface AppbarItem {
  nombre: string;
  ruta: string;
  clave: AppbarItems;
  submodulos?: ISidebarItem[];
}
