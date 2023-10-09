import { FC, useCallback, useMemo, useState, useRef, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import useStore from '../../../stores/store';
import { Avatar, SxProps, Tooltip } from '@mui/material';
import { APPBAR_MENU_ITEMS } from '../../../constants/menu';
import AnimatedBar from '../../../components/AnimatedBar';

const settings = ['Perfil', 'Dashboard', 'Cerrar sesión'];

interface AppbarProps {
  sx?: SxProps;
}

const Appbar: FC<AppbarProps> = ({ sx }) => {
  const usuario = useStore(({ usuario }) => usuario);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const moduloSeleccionado = useMemo(
    () => `/${pathname.split('/')[1]}`,
    [pathname]
  );

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const barRef = useRef<HTMLDivElement | null>(null);
  const selectedRef = useRef<HTMLDivElement | null>(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleButtonClick = useCallback(
    (ruta: string) => () => {
      navigate(ruta);
    },
    [navigate]
  );

  const cerrarSesion = useCallback(() => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  const handleMenuClick = useCallback(
    (opcion: string) => {
      setAnchorElUser(null);
      const opciones = {
        'Cerrar sesión': cerrarSesion,
      };
      const accion = opciones[opcion];
      if (accion) accion();
    },
    [cerrarSesion]
  );

  useEffect(() => {
    const target = selectedRef.current as HTMLDivElement;
    const bar = barRef.current as HTMLDivElement;
    if (bar && target) {
      const { left, right } = target.getBoundingClientRect();
      bar.style.left = `${Math.floor(left)}px`;
      bar.style.width = `${Math.floor(right - left)}px`;
    }
  }, [moduloSeleccionado]);

  return (
    <AppBar
      elevation={1}
      sx={{ backgroundColor: 'common.white', top: 0, ...sx }}
      position="sticky"
    >
      <Toolbar sx={{ px: 4, position: 'relative' }}>
        <AnimatedBar ref={barRef} />
        <AdbIcon
          color="primary"
          sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
        />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'common.black',
            textDecoration: 'none',
          }}
        >
          LOGO
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
            keepMounted
          >
            {APPBAR_MENU_ITEMS.map((item) => (
              <MenuItem key={item.clave} onClick={handleButtonClick(item.ruta)}>
                <Typography textAlign="center">{item.nombre}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <AdbIcon
          color="primary"
          sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
        />

        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            textDecoration: 'none',
          }}
        >
          LOGO
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            gap: '4px',
          }}
        >
          {APPBAR_MENU_ITEMS.map((item) =>
            item.ruta === moduloSeleccionado ? (
              <Box
                ref={selectedRef}
                key={item.clave}
                sx={{
                  height: '100%',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Button
                  variant="text"
                  color="primary"
                  key={item.clave}
                  onClick={handleButtonClick(item.ruta)}
                  sx={{ my: 2, display: 'block' }}
                >
                  {item.nombre}
                </Button>
              </Box>
            ) : (
              <Box
                key={item.clave}
                sx={{
                  height: '100%',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Button
                  variant="text"
                  color="primary"
                  key={item.clave}
                  onClick={handleButtonClick(item.ruta)}
                  sx={{ my: 2, display: 'block' }}
                >
                  {item.nombre}
                </Button>
              </Box>
            )
          )}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={usuario?.avatar} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={() => handleMenuClick(setting)}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
