import { useCallback, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import FormularioLogin from './components/FormularioLogin';
import Landscape from './components/Landscape';

import autenticarUsuario from '../../utils/functions/autenticarUsuario';
import useStore from '../../stores/store';
import { LoginForm, LoginResponse } from './interfaces';
import { iniciarSesion } from './services';

function Login() {
  const navigate = useNavigate();
  const setUsuario = useStore(({ setUsuario }) => setUsuario);

  const loginExitoso = useCallback((data: LoginResponse, form: LoginForm) => {
    const { token, usuario } = data;

    if (form.recordar) {
      localStorage.setItem('token', JSON.stringify(token!));
    } else {
      sessionStorage.setItem('token', JSON.stringify(token!));
    }

    setUsuario(usuario);
    navigate('/');
  }, [setUsuario, navigate]);

  const { mutate: login } = useMutation({
    mutationKey: 'login',
    mutationFn: iniciarSesion,
    onSuccess: loginExitoso,
    onError: () => setErrorLogin(true),
  });

  const [errorLogin, setErrorLogin] = useState<boolean>(false);

  useEffect(() => {
    const autenticado = autenticarUsuario();
    if (autenticado) navigate('/');
  }, [navigate]);

  return (
    <Box
      sx={{
        backgroundColor: '#EEF2F6',
        zIndex: 1,
        height: '100vh',
        width: '100%',
      }}
    >
      <Grid container height="100%">
        <Grid
          item
          xs={12}
          lg={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <FormularioLogin onSubmit={login} errorLogin={errorLogin} />
        </Grid>

        <Grid item md={8} display={{ xs: 'none', lg: 'flex' }}>
          <Landscape
            sx={{
              objectFit: 'cover',
              width: '100%',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
