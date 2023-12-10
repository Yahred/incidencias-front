import { FC, ReactNode } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

interface ContenedorProps {
  children: ReactNode;
}

const Contenedor: FC<ContenedorProps> = ({ children }) => {
  return (
    <Paper elevation={0} sx={({ palette: { grey } }) => ({ background: grey['300'] })}>
      <Box display="flex" p={2} gap={2} sx={{ overflowX: 'hidden' }}>
        {children}
      </Box>
    </Paper>
  );
};

export default Contenedor;
