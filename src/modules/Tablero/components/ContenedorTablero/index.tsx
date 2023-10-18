import { styled } from '@mui/material';

const ContenedorTablero = styled('ul')(({ theme: { palette } }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  backgroundColor: palette.grey['300'],
  alignItems: 'center',
  height: '80vh',
  borderRadius: 8,
  padding: 12,
  margin: 0,
}));

export default ContenedorTablero;
