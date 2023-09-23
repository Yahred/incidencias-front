import axios from '../../../config/axios';
import { LOGIN } from '../../../constants/uris';
import { LoginResponse } from '../interfaces';

export const iniciarSesion = (credenciales) => axios.post<unknown, LoginResponse>(LOGIN, credenciales);
