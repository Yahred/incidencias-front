import useStore from '../store';
import { Usuario } from '@interfaces/Usuario';

const useSesion = () => {
  const usuario = useStore(({ usuario }) => usuario);
  return usuario as Usuario;
};

export default useSesion;
