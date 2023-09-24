import { MensajesToast } from "../../constants/general";

const MapeoCamposUnicos = {
  'username': 'Nombre de usuario',
  'email': 'Email',
}

const errorDuplicado = (data: any) => {
  const { keyPattern } = data;
  const [key] = Object.keys(keyPattern);
  const campo = MapeoCamposUnicos[key];
  return MensajesToast.CAMPO_DUPLICADO(campo);
}

const CODIGOS_ERROR = {
  11000: errorDuplicado,
}

const obtenerMensajeError = (error: any) => {
  const { response } = error;

  if (!response) return MensajesToast.ERROR;

  const { status, data } = response;

  switch (status) {
    case 500: {
      if (data) {
        const { code } = data;
        const mensajeError = CODIGOS_ERROR[code];
        if (mensajeError && typeof mensajeError === 'function') return mensajeError(data);
      }
      break;
    }
    default: return '';
  }

}

export default obtenerMensajeError;
