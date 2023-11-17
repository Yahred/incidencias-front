import axios from '../config/axios';
import { NOTIFICACIONES } from '../constants/uris';

export const suscribirUsuario = (sub: PushSubscription) =>
  axios.post(NOTIFICACIONES, sub);
