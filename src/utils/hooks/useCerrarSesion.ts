import { useCallback } from 'react';

import OneSignal from 'react-onesignal';

const useCerrarSesion = () => {
  const cerrarSesion = useCallback(async () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    await OneSignal.logout();
  }, []);

  return {
    cerrarSesion,
  };
};

export default useCerrarSesion;
