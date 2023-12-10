import { styled } from '@mui/material';

const AnimatedBar = styled('div')(({ theme: { palette } }) => ({
  position: 'absolute',
  bottom: 0,
  transition: 'all .2s ease-in-out',
  height: 3,
  backgroundColor: palette.primary.main,
  width: '200px',
}));

export default AnimatedBar;
