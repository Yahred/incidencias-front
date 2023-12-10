import axios from '../config/axios';
import { PRIORIDADES } from '../constants/uris';
import { Prioridad } from '../interfaces/Prioridad';

export const obtenerPrioridades = () => axios.get<never, Prioridad[]>(PRIORIDADES);
