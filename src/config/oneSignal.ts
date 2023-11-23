import OneSignal from 'react-onesignal';

const { VITE_ONE_SIGNAL_APP_ID } = import.meta.env;

OneSignal.init({
  appId: VITE_ONE_SIGNAL_APP_ID,
  allowLocalhostAsSecureOrigin: import.meta.env.MODE === 'development',
  autoResubscribe: true,
});

export default OneSignal;
