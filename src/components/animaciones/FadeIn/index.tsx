import { SxProps, styled } from '@mui/material';
import { FC, ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  translate?: boolean;
  delay?: number;
  sx?: SxProps
}

const FadeInStyled = styled('div')({
  width: '100%'
});

const FadeIn: FC<FadeInProps> = ({ children, translate, delay, sx }) => {
  return (
    <FadeInStyled
      sx={{
        animation: `fadeIn ${delay}ms`,
        '@keyframes fadeIn': {
          '0%': {
            opacity: 0,
            transform: translate ? 'translateY(20px)' : 'none',
          },
          '100%': {
            opacity: 1,
            transform: translate ? 'translateY(0)' : 'none',
          },
        },
        ...sx
      }}
    >
      {children}
    </FadeInStyled>
  );
};

FadeIn.defaultProps = {
  delay: 600,
  translate: false
}

export default FadeIn;
