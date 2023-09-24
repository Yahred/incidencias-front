import { FC, ReactNode } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

interface DialogoProps {
  title?: string;
  open: boolean;
  children: ReactNode;
  onClose?: () => void;
}

const Dialogo: FC<DialogoProps> = ({ children, open, onClose, title }) => {
  return (
    <Dialog open={open} onClose={onClose}>
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
