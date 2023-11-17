import { SxProps, styled } from '@mui/material';
import { FC } from 'react';

const Img = styled('img')({});

interface LandscapeProps {
  sx?: SxProps;
}

const Landscape: FC<LandscapeProps> = ({ sx }) => {
  return <Img sx={sx} src="/assets/img/land.webp" />;
};

export default Landscape;
