import axios from '../config/axios';
import { endpoint, LOGIN, RENOVAR } from '../constants/uris';
import { RenovarResponse } from '../interfaces/Renovar';

export const renovarToken = (token: string) =>
  axios.post<unknown, RenovarResponse>(endpoint(LOGIN, RENOVAR), {
    token,
  });
