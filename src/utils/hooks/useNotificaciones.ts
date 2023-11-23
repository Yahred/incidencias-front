import { useCallback } from 'react';

import OneSignal from '../../config/oneSignal';

const useNotificaciones = () => {
  const pedirPermiso = useCallback(async (usuarioId: string) => {
    await OneSignal.Notifications.requestPermission();
    if (!OneSignal.Notifications.permission) return;

    await OneSignal.login(usuarioId);
  }, []);

  return {
    pedirPermiso,
  };
};

export default useNotificaciones;
