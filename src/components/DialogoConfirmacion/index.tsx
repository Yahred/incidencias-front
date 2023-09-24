import { FC, useCallback } from 'react';

import Box from '@mui/material/Box';

import Dialogo from '../Dialogo';
import { Button, Typography } from '@mui/material';

interface DialogoConfirmacionProps {
  onClose?: (confirmado: boolean) => void;
  open: boolean;
}

const DialogoConfirmacion: FC<DialogoConfirmacionProps> = ({
  open,
  onClose,
}) => {
  const handleClose = useCallback(
    (confirmado: boolean) => {
      return () => {
        if (onClose) onClose(confirmado);
      };
    },
    [onClose]
  );

  return (
    <Dialogo open={open} title="¿Estás seguro?">
      <Box p={2} display='flex' flexDirection='column' gap={2}>
        <Typography>Se perderán los cambios realizados</Typography>
        <Box display="flex" width="100%" justifyContent='space-between'>
          <Button variant="text" onClick={handleClose(false)}>
            Cancelar
          </Button>
          <Button variant="text" onClick={handleClose(true)}>
            Confirmar
          </Button>
        </Box>
      </Box>
    </Dialogo>
  );
};

DialogoConfirmacion.defaultProps = {
  onClose: () => {},
};

export default DialogoConfirmacion;
