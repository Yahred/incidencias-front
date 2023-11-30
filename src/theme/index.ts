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
    grey: {
      '300': '#eeeeee',
    },
  },
  typography: {
    caption: {
      color: '#595959',
      fontSize: 14,
    },
    fontFamily: ['Avenir', 'sans-serif'].join(','),
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
            minHeight: 45,
          },
        },
      },
      defaultProps: {
        size: 'small',
        fullWidth: true,
        InputProps: {
          style: {
            borderRadius: 4,
            fontWeight: 500,
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        fullWidth: true,
        size: 'medium',
        MenuProps: {
          sx: {
            zIndex: 1501,
          },
        },
      },
      styleOverrides: {
        root: {
          minHeight: 45,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: '#D32F2F',
        },
      },
    },
    MuiPagination: {
      defaultProps: {
        color: 'primary',
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: 16,
          textTransform: 'capitalize',
          fontWeight: 'bold',
        },
      },
    },
    MuiDrawer: {
      defaultProps: {
        hideBackdrop: true,
        sx: { zIndex: 1500 },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
