import { FC, ReactNode } from 'react';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { SxProps } from '@mui/material';

import useStore from '../../../stores/store';

interface SubmitButtonProps {
  children?: ReactNode;
  width?: number;
  sx?: SxProps;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  onClick?: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  type?: 'button' | 'submit' | 'reset';
}

const SubmitButton: FC<SubmitButtonProps> = ({
  children,
  sx,
  width,
  color,
  onClick,
  variant,
  type,
}) => {
  const isLoading = useStore(({ isMutating: isLoading }) => isLoading);

  return (
    <Button
      color={color}
      type={type}
      sx={{ width, ...sx }}
      disabled={isLoading}
      onClick={onClick}
      variant={variant}
    >
      {isLoading ? (
        <CircularProgress size={20} sx={{ color: 'common.white' }} />
      ) : (
        children
      )}
    </Button>
  );
};

SubmitButton.defaultProps = {
  onClick: () => {},
  type: 'submit',
};

export default SubmitButton;
