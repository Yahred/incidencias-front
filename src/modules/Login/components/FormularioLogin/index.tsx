import { FC } from 'react';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import IconTecNM from '../../../../components/IconTecNM';
import Form from '../../../../components/Form';
import FormField from '../../../../components/FormField';
import Checkbox from '../../../../components/Checkbox';

import { CAMPO_REQUERIDO } from '../../../../constants/validaciones';
import { UseFormReturn } from 'react-hook-form';

interface FormularioLoginProps {
  onSubmit: (data: { usuario: string; password: string }) => void;
  methods: UseFormReturn<any>;
  recordar: boolean;
  onRecordarChange: (value: boolean) => void;
}

const FormularioLogin: FC<FormularioLoginProps> = ({
  onSubmit,
  methods,
  recordar,
  onRecordarChange,
}) => {
  return (
    <Paper elevation={2}>
      <Box
        p={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={6}
      >
        <IconTecNM
          sx={{
            width: 170,
          }}
        />
        <Box display="flex" flexDirection="column" alignItems="center">
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
              name="usuario"
              placeholder="Usuario"
              rules={{ required: CAMPO_REQUERIDO }}
            />
            <FormField
              name="password"
              placeholder="Contraseña"
              type="password"
              rules={{ required: CAMPO_REQUERIDO }}
            />
            <Box display="flex" width="100%">
              <Checkbox
                checked={recordar}
                onChange={onRecordarChange}
                label="Mantener sesión"
              />
            </Box>
          </Box>

          <Button
            sx={{
              background:
                'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253));',
            }}
            fullWidth
            type="submit"
          >
            Iniciar sesión
          </Button>
        </Form>
      </Box>
    </Paper>
  );
};

export default FormularioLogin;
