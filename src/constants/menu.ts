import { AppbarItem } from '@interfaces/AppbarItem';
import { ISidebarItem } from '../interfaces/SidebarItem';

export enum AppbarItems {
  MiTrabajo = 'mi_trabajo',
  Incidencias = 'incidencias',
  Catalogos = 'catalogos',
  Reportes = 'reportes',
}

export const SIDEBAR_CATALOGOS: ISidebarItem[] = [
  {
    nombre: 'Usuarios',
    ruta: '/',
    icono: 'person',
  },
  {
    divider: true,
  },
  {
    nombre: 'Departamentos',
    ruta: '/departamentos',
    icono: 'apartment',
  },
  {
    nombre: 'Edificios',
    ruta: '/edificios',
    icono: 'domain',
  },
  {
    nombre: 'Salones',
    ruta: '/salones',
    icono: 'class',
  },
  {
    divider: true,
  },
  {
    nombre: 'Recursos',
    ruta: '/recursos',
    icono: 'devices',
  },
  {
    nombre: 'Modelos',
    ruta: '/modelos',
    icono: 'settings',
  },
  {
    nombre: 'Servicios',
    ruta: '/servicios',
    icono: 'construction',
  },
  {
    nombre: 'Categorías',
    ruta: '/categorias',
    icono: 'subject',
  },
  {
    nombre: 'Áreas',
    ruta: '/areas',
    icono: 'category',
  },
];

export const APPBAR_MENU_ITEMS: AppbarItem[] = [
  {
    nombre: 'Mí trabajo',
    ruta: '/',
    clave: AppbarItems.MiTrabajo,
  },
  {
    nombre: 'Incidencias',
    ruta: '/incidencias',
    clave: AppbarItems.Incidencias,
  },
  {
    nombre: 'Catalógos',
    ruta: '/catalogos',
    clave: AppbarItems.Catalogos,
    submodulos: SIDEBAR_CATALOGOS,
  },
  {
    nombre: 'Reportes',
    ruta: '/reportes',
    clave: AppbarItems.Reportes,
  },
];

export const TABS_REPORTES = [
  {
    id: 1,
    nombre: 'Gestión de configuraciones',
    ruta: '/configuraciones',
  },
  {
    id: 2,
    nombre: 'Incidencias',
    ruta: '/configuraciones',
  },
];
