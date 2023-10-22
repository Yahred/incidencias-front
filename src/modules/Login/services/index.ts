import axios from '../../../config/axios';
import { LOGIN } from '@constants/uris';
import { LoginForm, LoginResponse } from '../interfaces';

export const iniciarSesion = (credenciales: LoginForm) =>
  axios.post<unknown, LoginResponse>(LOGIN, credenciales);
