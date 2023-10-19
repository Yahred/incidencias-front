import { useCallback, useMemo } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import List from '@mui/material/List';

import SidebarItem from '../SidebarItem';

import { APPBAR_MENU_ITEMS } from '@constants/menu';

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const submodulos = useMemo(() => {
    const modulo = pathname.split('/')[1];
    const itemSeleccionado = APPBAR_MENU_ITEMS.find(
      ({ ruta }) => ruta === `/${modulo}`
    );
    if (!itemSeleccionado) return [];
    return itemSeleccionado.submodulos || [];
  }, [pathname]);

  const submoduloSeleccionado = useMemo<string>(() => {
    let seleccionado = submodulos.find(({ ruta }) => {
      if (ruta === '/') return false;
      return pathname.includes(ruta!)
    });

    if (!seleccionado) {
      seleccionado = submodulos.find(({ ruta }) => ruta === '/');
    }

    return seleccionado?.ruta || '';
  }, [submodulos, pathname]);

  const handleItemClick = useCallback((ruta: string) => {
    if (ruta === '/') return navigate('/catalogos');
    navigate(`.${ruta}`);
  },[navigate]);

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
          <SidebarItem
            key={index}
            item={item}
            divider={!!item.divider}
            seleccionado={submoduloSeleccionado === item.ruta}
            onClick={handleItemClick}
          />
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
