import { createTheme, responsiveFontSizes } from '@mui/material';

let theme = createTheme({
  palette: {
    primary: {
      main: '#724A73',
      '900': '#0D0E30',
    },
    secondary: {
      main: '#724A73',
      '900': '#36294E',
    },
    info: {
      main: '#60A5D4',
    },
  },
  typography: {
    caption: {
      color: '#595959',
      fontSize: 14,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'large',
      },
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          borderRadius: '0.5em',
          textTransform: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            height: 45,
          },
        },
      },
      defaultProps: {
        size: 'small',
        fullWidth: true,
        InputProps: {
          style: {
            borderRadius: '0.5em',
            fontWeight: 500,
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
