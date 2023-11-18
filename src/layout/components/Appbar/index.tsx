import { FC, useCallback, useMemo, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { SxProps } from '@mui/material';

import NavMenu from '../NavMenu';
import MobileAppBar from '../MobileAppBar';
import Notifications from '../Notifications';

import useSesion from '../../../stores/hooks/useSesion';
import useSmallScreen from '@hooks/useSmallScreen';
import useCerrarSesion from '../../../utils/hooks/useCerrarSesion';
import { Usuario } from '@interfaces/Usuario';
import { APPBAR_MENU_ITEMS, AppbarItems } from '@constants/menu';
import { TipoUsuario } from '@interfaces/TipoUsuario';
import { TiposUsuario } from '@constants/tiposUsuario';

const settings = ['Perfil', 'Dashboard', 'Cerrar sesión'];

interface AppbarProps {
  sx?: SxProps;
}

const Appbar: FC<AppbarProps> = ({ sx }) => {
  const usuario = useSesion() as Usuario;
  const { cerrarSesion } = useCerrarSesion();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isSmallScreen = useSmallScreen();

  const moduloSeleccionado = useMemo(
    () => `/${pathname.split('/')[1]}`,
    [pathname]
  );

  const modulosConAcceso = useMemo(() => {
    if (!usuario) return [];

    const tipoUsuario = usuario.tipoUsuario as TipoUsuario;
    if (tipoUsuario.id === TiposUsuario.Admin) return APPBAR_MENU_ITEMS;

    const { modulos } = usuario.tipoUsuario as TipoUsuario;
    if (!modulos) return APPBAR_MENU_ITEMS;

    return APPBAR_MENU_ITEMS.filter(
      ({ clave }) => clave === AppbarItems.MiTrabajo || modulos?.includes(clave)
    );
  }, [usuario]);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavClick = useCallback(
    (ruta: string) => {
      navigate(ruta);
    },
    [navigate]
  );

  const handleCerrarSesion = useCallback(async () => {
    await cerrarSesion();
    navigate('/login');
  }, [navigate, cerrarSesion]);

  const handleMenuClick = useCallback(
    (opcion: string) => {
      setAnchorElUser(null);
      const opciones = {
        'Cerrar sesión': handleCerrarSesion,
      };
      const accion = opciones[opcion];
      if (accion) accion();
    },
    [handleCerrarSesion]
  );

  if (isSmallScreen) {
    return (
      <MobileAppBar
        moduloSeleccionado={moduloSeleccionado}
        onNavMenuClick={handleNavClick}
        modulos={modulosConAcceso}
      />
    );
  }

  return (
    <AppBar
      elevation={1}
      sx={{ backgroundColor: 'common.white', top: 0, ...sx }}
      position="sticky"
    >
      <Toolbar sx={{ px: 4, position: 'relative' }}>
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

        <NavMenu
          onClick={handleNavClick}
          moduloSeleccionado={moduloSeleccionado}
          modulos={modulosConAcceso}
        />

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

        <Box sx={{ flexGrow: 0, gap: 1, display: 'flex' }}>
          <Notifications />
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
