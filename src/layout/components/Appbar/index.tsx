import { FC, useCallback, useMemo, useState } from 'react';

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

import { Avatar, SxProps, Tooltip } from '@mui/material';
import { APPBAR_MENU_ITEMS } from '../../../constants/menu';
import { useLocation, useNavigate } from 'react-router-dom';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

interface AppbarProps {
  sx?: SxProps;
}

const Appbar: FC<AppbarProps> = ({ sx }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const moduloSeleccionado = useMemo(() => `/${pathname.split('/')[1]}`, [pathname]);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleButtonClick = useCallback((ruta: string) => {
    return () => {
      navigate(ruta);
    }
  }, [navigate]);

  return (
    <AppBar
      elevation={1}
      sx={{ backgroundColor: 'common.white', top: 0, ...sx }}
      position="sticky"
    >
      <Toolbar sx={{ px: 4 }}>
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
            onClick={() => setIsSidebarOpen(true)}
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
                key={item.clave}
                sx={{
                  height: '100%',
                  borderBottom: '3px solid',
                  borderColor: 'primary.main',
                  display: 'grid',
                  placeItems: 'center'
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
                  placeItems: 'center'
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
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
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
