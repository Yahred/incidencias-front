import { FC, ReactNode } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { SxProps } from '@mui/material';

interface DialogoProps {
  title?: string | ReactNode;
  open: boolean;
  children: ReactNode;
  onClose?: () => void;
  onClick?: () => void;
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
  onClick,
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
