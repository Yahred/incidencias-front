import { useCallback, useState } from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { useForm } from 'react-hook-form';

import FormularioLogin from './components/FormularioLogin';
import Landscape from './components/Landscape';

import { LoginForm } from './interfaces';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const methods = useForm<LoginForm>();
  const [recordar, setRecordar] = useState<boolean>(false);

  const login = useCallback(
    (data: LoginForm) => {
      navigate('/');
    },
    [navigate]
  );

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
          xs={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <FormularioLogin
            methods={methods}
            onSubmit={login}
            recordar={recordar}
            onRecordarChange={setRecordar}
          />
        </Grid>

        <Grid item xs={8} display="flex">
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
