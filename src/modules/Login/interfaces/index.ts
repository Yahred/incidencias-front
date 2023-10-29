import { Usuario } from "../../../interfaces/Usuario";

export interface LoginForm {
  username: string;
  password: string;
  recordar: boolean;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}
