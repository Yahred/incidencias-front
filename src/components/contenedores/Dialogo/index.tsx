import { FC, ReactNode } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import { Stack, SxProps } from '@mui/material';

import BotonCerrar from '@components/generales/BotonCerrar';

interface DialogoProps {
  title?: string | ReactNode;
  open: boolean;
  children: ReactNode;
  onClose?: () => void;
  onClick?: () => void;
  sx?: SxProps;
  fullWidth?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  botonCerrar?: boolean;
  onClickBotonCerrar?: () => void;
}

const Dialogo: FC<DialogoProps> = ({
  children,
  open,
  onClose,
  title,
  sx,
  fullWidth,
  maxWidth,
  onClick,
  botonCerrar,
  onClickBotonCerrar,
}) => {
  return (
    <Dialog
      open={open}
      onClick={onClick}
      onClose={onClose}
      sx={sx}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      {botonCerrar && (
        <Stack direction="row" justifyContent="flex-end" p={1}>
          <BotonCerrar onClick={onClickBotonCerrar} />
        </Stack>
      )}
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  );
};

Dialogo.defaultProps = {
  onClose: () => {},
  onClick: () => {},
  open: false,
  title: '',
};

export default Dialogo;
