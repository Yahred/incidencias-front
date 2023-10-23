import { useMediaQuery, useTheme } from '@mui/material';

const useSmallScreen = () => {
  const { breakpoints } = useTheme();
  const isSmallScreen = useMediaQuery(breakpoints.down('md'));
  return isSmallScreen;
};

export default useSmallScreen;
