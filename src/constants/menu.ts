import { ISidebarItem } from "../interfaces/SidebarItem";

export const SIDEBAR_CATALOGOS: ISidebarItem[] = [
  {
    nombre: 'Usuarios',
    ruta: '/',
    icono: 'person'
  },
  {
    divider: true,
  },
  {
    nombre: 'Edificios',
    ruta: '/edificios',
    icono: 'domain_add'
  },
  {
    nombre: 'Salones',
    ruta: '/salones',
    icono: 'class'
  },
  {
    divider: true,
  },
  {
    nombre: 'Recursos',
    ruta: '/recursos',
    icono: 'devices'
  },
  {
    nombre: 'Modelos',
    ruta: '/modelos',
    icono: 'settings'
  },
  {
    nombre: 'Categorías',
    ruta: '/categorias',
    icono: 'subject'
  },
  {
    nombre: 'Áreas',
    ruta: '/areas',
    icono: 'category'
  },
]


export const APPBAR_MENU_ITEMS = [
  {
    nombre: 'Mí trabajo',
    ruta: '/',
    clave: 'mi_trabajo',
  },
  {
    nombre: 'Incidencias',
    ruta: '/incidencias',
    clave: 'incidencias',
  },
  {
    nombre: 'Tablero',
    ruta: '/tablero',
    clave: 'tablero',
  },
  {
    nombre: 'Catalógos',
    ruta: '/catalogos',
    clave: 'catalogos',
    submodulos: SIDEBAR_CATALOGOS,
  },
];
