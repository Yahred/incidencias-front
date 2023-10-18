import { FC } from 'react';

import Box from '@mui/material/Box';
import { Typography, styled } from '@mui/material';

import { NOT_FOUND } from '../../constants/imagenes';
import Layout from '../../layout';

const NotFoundImage = styled('img')(() => ({}));

const NotFound: FC = () => {
  return (
    <Layout>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        rowGap={2}
      >
        <NotFoundImage src={NOT_FOUND} />
        <Typography variant="h2">404</Typography>
        <Typography>
          Ups parece que no existe el sitio al que quieres acceder
        </Typography>
      </Box>
    </Layout>
  );
};

export default NotFound;
