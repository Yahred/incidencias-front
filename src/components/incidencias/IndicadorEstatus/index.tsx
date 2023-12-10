import { FC } from 'react';

import Chip from '@mui/material/Chip';

import { SxProps } from '@mui/material';

import { Estatus } from '@interfaces/Estatus';

interface IndicadorEstatusProps {
  estatus?: Estatus;
  sx?: SxProps;
}

const IndicadorEstatus: FC<IndicadorEstatusProps> = ({ estatus, sx }) => {
  return (
    <Chip
      label={estatus?.nombre}
      sx={{
        ...sx,
        backgroundColor: estatus?.color,
      }}
    />
  );
};

export default IndicadorEstatus;
