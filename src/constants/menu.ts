export const SIDEBAR_CATALOGOS = [
  {
    nombre: 'Usuarios',
    ruta: '/',
    icono: 'person'
  },
  {
    nombre: 'Recursos',
    ruta: '/recursos',
    icono: 'devices'
  },
  {
    nombre: '',
    ruta: '',
    icono: ''
  },
  {
    nombre: '',
    ruta: '',
    icono: ''
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
