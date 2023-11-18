import { useMutation } from 'react-query';
import { useCallback } from 'react';

import useStore from '../../stores/store';
import { eliminarSuscripcion } from '../../services';

const useCerrarSesion = () => {
  const { swSubscription, setSwSubscription } = useStore(
    ({ swSubscription, setSwSubscription }) => ({
      swSubscription,
      setSwSubscription,
    })
  );

  const { mutateAsync: eliminarSuscripcionMut } = useMutation({
    mutationKey: 'desuscribir-notificaciones',
    mutationFn: eliminarSuscripcion,
    onSuccess: () => {
      console.log(swSubscription)
      swSubscription?.unsubscribe();
      setSwSubscription(null);
    },
  });

  const cerrarSesion = useCallback(async () => {
    if (swSubscription) await eliminarSuscripcionMut(swSubscription.endpoint);

    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }, [swSubscription, eliminarSuscripcionMut]);

  return {
    cerrarSesion,
  };
};

export default useCerrarSesion;
