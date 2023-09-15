import { FC } from 'react';

import Accordion from '@mui/material/Accordion';

interface MenuProps {
  open: boolean;
}

const Menu: FC<MenuProps> = ({ open }) => {
  return <Accordion></Accordion>;
};

export default Menu;
