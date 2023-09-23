import { FC, ReactNode, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Form from '../Form';
import useStore from '../../stores/store';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../SubmitButton';

interface ContenedorFormularioProps {
  methods: UseFormReturn<any>;
  children: ReactNode;
  onSubmit: (data: any) => Promise<void> | void;
  title?: string;
  subtitle?: string;
}

const ContenedorFormulario: FC<ContenedorFormularioProps> = ({
  methods,
  children,
  onSubmit,
  title,
  subtitle,
}) => {
  const navigate = useNavigate();
  const isLoading = useStore(({ isLoading }) => isLoading);

  const handleSubmit = useCallback(async (data: any) => {
    try {
      await onSubmit(data);
      navigate('../');
    } catch {

    }
  }, [onSubmit]);

  return (
    <Form methods={methods} onSubmit={methods.handleSubmit(handleSubmit)}>
      <Box display="flex" flexDirection="column" gap={4}>
        <Box display="flex" width="100%" justifyContent="space-between">
          <Box display="flex" flexDirection="column">
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body1" color="gray">
              {subtitle}
            </Typography>
          </Box>
          <Box display="flex" paddingY={4} gap={2}>
            <Button type="button">Cancelar</Button>
            <SubmitButton width={100}>
              Guardar
            </SubmitButton>
          </Box>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns={{
            sx: 'repeat(1, minmax(0, 1fr))',
            md: 'repeat(2, minmax(0, 1fr))',
          }}
          columnGap={3}
          rowGap={3}
        >
          {children}
        </Box>
      </Box>
    </Form>
  );
};

ContenedorFormulario.defaultProps = {
  onSubmit: () => {},
};

export default ContenedorFormulario;
