import { FC } from 'react';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import FadeIn from '../../../../components/animaciones/FadeIn';

interface TarjetaProps {
  title?: string;
  value?: number | string;
  isLoading?: boolean;
}

const Tarjeta: FC<TarjetaProps> = ({ title, value, isLoading }) => {
  if (isLoading) {
    return (
      <Card variant="outlined" sx={{ width: 240, height: 180, padding: 2 }}>
        <Skeleton height={60} />
        <Skeleton height={100} />
      </Card>
    );
  }

  return (
    <Card variant="outlined" sx={{ width: '100%', height: 180 }}>
      <FadeIn sx={{ height: '100%' }}>
        <Box
          display="flex"
          flexDirection="column"
          rowGap={2}
          padding={2}
          alignItems="stretch"
          height="90%"
          justifyContent="space-between"
        >
          <Typography variant="h5">{title}</Typography>
          <Typography variant="h3">{value}</Typography>
        </Box>
      </FadeIn>
    </Card>
  );
};

export default Tarjeta;
