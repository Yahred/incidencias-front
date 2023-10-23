import { FC, useCallback, useState } from 'react';
import {
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Toolbar,
  AppBar,
  Stack,
} from '@mui/material';
import { Menu as IconMenu } from '@mui/icons-material'

import useSesion from '../../../stores/hooks/useSesion';
import { Usuario } from '@interfaces/Usuario';
import NavMenu from '../NavMenu';
import useStore from '../../../stores/store';

interface MobileAppBarProps {
  onOpenUserMenu?: () => void;
  onCloseUserMenu?: () => void;
  settings?: string[];
  moduloSeleccionado: string;
  onNavMenuClick?: (ruta: string) => void;
}

const MobileAppBar: FC<MobileAppBarProps> = ({
  onOpenUserMenu,
  onNavMenuClick,
  settings,
  moduloSeleccionado,
}) => {
  const usuario = useSesion() as Usuario;
  const toggleSidebar = useStore(({ toggleSidebar }) => toggleSidebar);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSidebarClick = useCallback(() => {
    toggleSidebar();
  }, [toggleSidebar]);

  return (
    <AppBar
      elevation={1}
      sx={{ backgroundColor: 'common.white', top: 0 }}
      position="sticky"
    >
      <Toolbar sx={{ px: { lg: 4, xs: 1 }, position: 'relative' }}>
        <Stack width="100%" pt={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <IconButton onClick={handleSidebarClick}>
              <IconMenu />
            </IconButton>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box>
              <Tooltip title="Open settings">
                <IconButton onClick={onOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={usuario?.avatar} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                anchorEl={anchorElUser}
                keepMounted
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings!.map((setting) => (
                  <MenuItem key={setting} onClick={() => {}}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Stack>
          <NavMenu moduloSeleccionado={moduloSeleccionado} onClick={onNavMenuClick!} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

MobileAppBar.defaultProps = {
  settings: [],
  onCloseUserMenu: () => {},
  onOpenUserMenu: () => {},
};

export default MobileAppBar;
