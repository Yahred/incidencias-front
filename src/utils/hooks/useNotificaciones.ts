import { useCallback } from 'react';

import { useMutation } from 'react-query';

import { suscribirUsuario } from '@services';
import useStore from '../../stores/store';

const useNotificaciones = () => {
  const { mutate: suscribir } = useMutation({
    mutationKey: ['sub'],
    mutationFn: suscribirUsuario,
  });

  const setSwSubscription = useStore(({ setSwSubscription }) => setSwSubscription);

  const crearSuscripcion = useCallback(async () => {
    const worker = await navigator.serviceWorker.register(
      '/sw.js',
      {
        scope: '/',
      }
    );
    const sub = await worker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
    });
    setSwSubscription(sub);
    suscribir(sub);
  }, [suscribir, setSwSubscription]);

  const pedirPermiso = useCallback(async () => {
    if (!('Notification' in window)) return;
    const permiso = await Notification.requestPermission();
    if (permiso !== 'granted') return;
    crearSuscripcion()
  }, [crearSuscripcion]);

  return {
    pedirPermiso,
  };
};

export default useNotificaciones;
