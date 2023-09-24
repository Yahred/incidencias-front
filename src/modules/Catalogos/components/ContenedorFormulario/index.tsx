import { FC, ReactNode, useCallback, useState } from 'react';

import { UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import DialogoConfirmacion from '../../../../components/DialogoConfirmacion';
import Form from '../../../../components/Form';
import SubmitButton from '../../../../components/SubmitButton';

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

  const [isDialogoOpen, setIsDialogoOpen] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        await onSubmit(data);
        navigate('../');
      } catch (error) {
        console.log(error);
      }
    },
    [onSubmit, navigate]
  );

  const handleRegresar = useCallback(() => {
    setIsDialogoOpen(true);
  }, []);

  const handleDialogoClose = useCallback((confirmado: boolean) => {
    setIsDialogoOpen(false);
    if (confirmado) navigate('../');
  }, [navigate]);

  return (
    <>
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
              <Button type="button" onClick={handleRegresar}>Regresar</Button>
              <SubmitButton width={100} color="success">
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
      <DialogoConfirmacion open={isDialogoOpen} onClose={handleDialogoClose} />
    </>
  );
};

ContenedorFormulario.defaultProps = {
  onSubmit: () => {},
};

export default ContenedorFormulario;
