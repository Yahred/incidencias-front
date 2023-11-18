import { useMutation } from 'react-query';
import { useCallback } from 'react';

import { eliminarSuscripcion } from '../../services';

const useCerrarSesion = () => {
  const { mutateAsync: eliminarSuscripcionMut } = useMutation({
    mutationKey: 'desuscribir-notificaciones',
    mutationFn: eliminarSuscripcion,
  });

  const cerrarSesion = useCallback(async () => {
    const swRegistration = await navigator.serviceWorker.ready;
    const sub = await swRegistration.pushManager.getSubscription();
    if (sub) {
      await eliminarSuscripcionMut(sub.endpoint);
      sub.unsubscribe();
    }

    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }, [eliminarSuscripcionMut]);

  return {
    cerrarSesion,
  };
};

export default useCerrarSesion;
