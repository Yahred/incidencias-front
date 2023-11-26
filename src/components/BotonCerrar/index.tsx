import { FC } from 'react';

import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface BotonCerrarProps {
  onClick?: () => void;
}

const BotonCerrar: FC<BotonCerrarProps> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <Close />
    </IconButton>
  );
};

export default BotonCerrar;
