import { FC } from 'react';

import Box from '@mui/material/Box';
import { IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Dialogo from '@components/Dialogo';

interface CarruselProps {
  open: boolean;
  onClose: () => void;
  imagen: string;
}

const ImagenSeleccionada = styled('img')(() => ({
  objectFit: 'cover',
  height: '100%',
}));

const Carrusel: FC<CarruselProps> = ({ open, onClose, imagen }) => {
  return (
    <Dialogo
      open={open}
      title={
        <Box width="100%" display="flex" justifyContent="flex-end">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      }
      maxWidth="xl"
      fullWidth
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          maxHeight: '65vh',
          justifyContent: 'center',
          overflow: 'auto',
          paddingY: 2,
        }}
      >
        <ImagenSeleccionada src={imagen} />
      </Box> 
    </Dialogo>
  );
};

export default Carrusel;
