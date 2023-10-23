import useStore from '../store';

const useSesion = () => {
  const usuario = useStore(({ usuario }) => usuario);

  return {
    ...usuario,
  };
};

export default useSesion;
