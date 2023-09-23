import { Button, CircularProgress, SxProps } from '@mui/material';
import { FC, ReactNode } from 'react';
import useStore from '../../stores/store';

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
}

const SubmitButton: FC<SubmitButtonProps> = ({
  children,
  sx,
  width,
  color,
}) => {
  const isLoading = useStore(({ isLoading }) => isLoading);

  return (
    <Button
      color={color}
      type="submit"
      sx={{ width, ...sx }}
      disabled={isLoading}
    >
      {isLoading ? (
        <CircularProgress size={20} sx={{ color: 'common.white' }} />
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
