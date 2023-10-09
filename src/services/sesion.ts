import axios from '../config/axios';
import { param, LOGIN, RENOVAR } from '../constants/uris';
import { RenovarResponse } from '../interfaces/Renovar';

export const renovarToken = (token: string) =>
  axios.post<unknown, RenovarResponse>(param(LOGIN, RENOVAR), {
    token,
  });
