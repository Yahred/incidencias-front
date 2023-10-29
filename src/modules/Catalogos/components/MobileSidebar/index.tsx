import { FC, useCallback } from 'react';

import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';

import SidebarItem from '../SidebarItem';

import useStore from '../../../../stores/store';
import { ISidebarItem } from '@interfaces/SidebarItem';

interface MobileSidebarProps {
  submodulos: ISidebarItem[];
  submoduloSeleccionado: string;
  onItemClick: (ruta: string) => void;
}

const MobileSidebar: FC<MobileSidebarProps> = ({
  submodulos,
  submoduloSeleccionado,
  onItemClick,
}) => {
  const { isSidebarOpen, setIsSidebarOpen } = useStore(
    ({ isSidebarOpen, setIsSidebarOpen }) => ({
      isSidebarOpen,
      setIsSidebarOpen,
    })
  );

  const handleItemClick = useCallback(
    (ruta: string) => {
      setIsSidebarOpen(false);
      onItemClick(ruta);
    },
    [onItemClick, setIsSidebarOpen]
  );

  return (
    <Drawer open={isSidebarOpen} onClick={() => setIsSidebarOpen(false)}>
      <Stack py={1} px={2}>
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
      </Stack>
    </Drawer>
  );
};

MobileSidebar.defaultProps = {
  submodulos: [],
};

export default MobileSidebar;
