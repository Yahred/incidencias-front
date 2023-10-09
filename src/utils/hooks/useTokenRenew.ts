import { useCallback } from 'react';
import { useMutation } from 'react-query';

import useStore from '../../stores/store';
import { renovarToken } from '../../services/sesion';

const useTokenRenew = () => {
  const setUsuario = useStore(({ setUsuario }) => setUsuario);

  const { mutateAsync } = useMutation({
    mutationKey: 'renovar-token',
    mutationFn: renovarToken
  });

  const renovarSesion = useCallback(async () => {
    let tokenAnterior = localStorage.getItem('token');
    const esSesionPersistente = !!tokenAnterior;

    if (!tokenAnterior) tokenAnterior = sessionStorage.getItem('token');
    if (!tokenAnterior) return;

    tokenAnterior = JSON.parse(tokenAnterior) as string;

    const { token, usuario } = await mutateAsync(tokenAnterior);

    setUsuario(usuario);

    if (esSesionPersistente) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      sessionStorage.setItem('token', JSON.stringify(token));
    }
  }, [mutateAsync, setUsuario]);

  return {
    renovarSesion,
  };
};

export default useTokenRenew;
