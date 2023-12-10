import { FC } from 'react';

import { Close } from '@mui/icons-material';
import { IconButton, SxProps } from '@mui/material';

interface BotonCerrarProps {
  onClick?: () => void;
  sx?: SxProps
}

const BotonCerrar: FC<BotonCerrarProps> = ({ onClick, sx }) => {
  return (
    <IconButton onClick={onClick} sx={sx} >
      <Close />
    </IconButton>
  );
};

export default BotonCerrar;
