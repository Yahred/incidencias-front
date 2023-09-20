import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Appbar from '../../layout/components/Appbar';
import { useCallback, useMemo, useState } from 'react';
import { Button, Icon } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { APPBAR_MENU_ITEMS } from '../../constants/menu';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  position: 'fixed',
  top: 0,
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const submodulos = useMemo(() => {
    const modulo = pathname.split('/')[1];
    const itemSeleccionado = APPBAR_MENU_ITEMS.find(({ ruta }) => ruta === `/${modulo}`);
    if (!itemSeleccionado) return [];
    return itemSeleccionado.submodulos || [];
  }, [pathname])

  const menuItems = useMemo(
    () => [
      {
        nombre: 'Usuarios',
        ruta: '/catalogos/',
        icono: 'person',
      },
      {
        nombre: 'Recursos',
        ruta: '/catalogos/recursos',
        icono: '',
      },
      {
        nombre: 'Modelos',
        ruta: '/catalogos/modelos',
        icono: '',
      },
      {
        nombre: 'Modelos',
        ruta: '/catalogos/modelos',
        icono: '',
      },
      {
        nombre: 'Modelos',
        ruta: '/catalogos/modelos',
        icono: '',
      },
      {
        nombre: 'Modelos',
        ruta: '/catalogos/modelos',
        icono: '',
      },
    ],
    []
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleItemClick = useCallback((ruta: string) => {
    console.log(ruta);
    if (ruta === '/') return navigate('/catalogos');

    navigate(`.${ruta}`);
  }, [navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        minWidth: 220,
        boxShadow: 2,
        py: 1,
      }}
    >
      <List>
        {submodulos.map((item, index) => (
          <ListItem disablePadding key={index}>
            <ListItemButton onClick={() => handleItemClick(item.ruta)}>
              <ListItemIcon>
                <Icon color={pathname === item.ruta ? 'secondary' : 'inherit'}>
                  {item.icono}
                </Icon>
              </ListItemIcon>
              <ListItemText
                sx={{
                  color: pathname === item.ruta ? 'secondary.main' : 'inherit',
                  fontSize: 12,
                }}
                primary={
                  <Typography
                    variant="caption"
                    sx={{
                      color:
                        pathname === item.ruta ? 'secondary.main' : 'inherit',
                    }}
                  >
                    {item.nombre}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
