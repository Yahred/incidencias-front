import { FC } from 'react';

import Chip from '@mui/material/Chip';

import { SxProps } from '@mui/material';

import { Prioridad } from '../../../interfaces/Prioridad';

interface IndicadorPrioridadProps {
  prioridad?: Prioridad;
  sx?: SxProps;
}

const IndicadorPrioridad: FC<IndicadorPrioridadProps> = ({ prioridad, sx }) => {
  return (
    <Chip
      label={prioridad?.nombre}
      sx={{
        ...sx,
        backgroundColor: prioridad?.color,
      }}
    />
  );
};

export default IndicadorPrioridad;
