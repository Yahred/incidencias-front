import { FC, ReactNode } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import { SxProps } from '@mui/material';

interface DialogoProps {
  title?: string | ReactNode;
  open: boolean;
  children: ReactNode;
  onClose?: () => void;
  sx?: SxProps;
  fullWidth?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const Dialogo: FC<DialogoProps> = ({
  children,
  open,
  onClose,
  title,
  sx,
  fullWidth,
  maxWidth,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={sx}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  );
};

Dialogo.defaultProps = {
  onClose: () => {},
  open: false,
  title: '',
};

export default Dialogo;
