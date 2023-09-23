import { Usuario } from "../../../interfaces/Usuario";

export interface LoginForm {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}
