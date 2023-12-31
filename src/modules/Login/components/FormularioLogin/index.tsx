import { FC } from 'react';

import { useForm } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Form from '@components/formularios/Form';
import FormField from '@components/formularios/FormField';
import SubmitButton from '@components/formularios/SubmitButton';
import FormCheckbox from '@components/formularios/FormCheckbox';

import { CAMPO_REQUERIDO } from '@constants/validaciones';
import { LoginForm } from '../../interfaces';

interface FormularioLoginProps {
  onSubmit: (data: LoginForm) => void;
  errorLogin: boolean;
}

const FormularioLogin: FC<FormularioLoginProps> = ({
  onSubmit,
  errorLogin,
}) => {
  const methods = useForm<LoginForm>();

  return (
    <Paper elevation={2}>
      <Box
        p={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={4}
      >
        <Box display="flex" flexDirection="column" alignItems="center" py={4}>
          <Typography variant="h5" fontWeight="bold">
            Hola, bienvenido de vuelta!
          </Typography>
          <Typography variant="caption">
            Introduce tus credenciales para acceder
          </Typography>
        </Box>

        <Form
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
          onSubmit={onSubmit}
          methods={methods}
        >
          <Box display="flex" flexDirection="column" rowGap={2}>
            <FormField
              name="username"
              title='Nombre de usuario'
              placeholder="Introduce tu nombre de usuario"
              rules={{ required: CAMPO_REQUERIDO }}
            />
            <FormField
              name="password"
              title='Contraseña'
              placeholder="Introduce tu contraseña"
              type="password"
              rules={{ required: CAMPO_REQUERIDO }}
            />
            <Box display="flex" width="100%">
              <FormCheckbox
                name='recordar'
                label="Mantener sesión"
                defaultValue={true}
              />
            </Box>
          </Box>

          {errorLogin && <Alert severity='error'>
            La contraseña o el usuario son incorrectos
          </Alert>}

          <SubmitButton>
            Iniciar sesión
          </SubmitButton>
        </Form>
      </Box>
    </Paper>
  );
};

export default FormularioLogin;
