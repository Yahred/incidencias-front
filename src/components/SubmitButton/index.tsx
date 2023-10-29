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
  onClick: () => void;
}

const SubmitButton: FC<SubmitButtonProps> = ({
  children,
  sx,
  width,
  color,
  onClick,
}) => {
  const isLoading = useStore(({ isMutating: isLoading }) => isLoading);

  return (
    <Button
      color={color}
      type="submit"
      sx={{ width, ...sx }}
      disabled={isLoading}
      onClick={onClick}
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
