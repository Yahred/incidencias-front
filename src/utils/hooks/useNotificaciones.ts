import { useCallback } from 'react';

import { useMutation } from 'react-query';

import { suscribirUsuario } from '@services';

const useNotificaciones = () => {
  const { mutate: suscribir } = useMutation({
    mutationKey: ['sub'],
    mutationFn: suscribirUsuario,
  });

  const crearSuscripcion = useCallback(async () => {
    const worker = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });
    const sub = await worker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
    });

    suscribir(sub);
  }, [suscribir]);

  const pedirPermiso = useCallback(async () => {
    if (!('Notification' in window)) return;
    const permiso = await Notification.requestPermission();
    if (permiso !== 'granted') return;

    const swRegistration = await navigator.serviceWorker.ready;
    const sub = await swRegistration.pushManager.getSubscription();

    if (!sub) crearSuscripcion();
  }, [crearSuscripcion]);

  return {
    pedirPermiso,
  };
};

export default useNotificaciones;
