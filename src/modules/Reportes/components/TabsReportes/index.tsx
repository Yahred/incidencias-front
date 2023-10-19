import { FC } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface TabsReportesProps {
  value: number;
  onChange: (value: number) => void;
  options: { id: number; nombre: string }[];
}

const TabsReportes: FC<TabsReportesProps> = ({ onChange, value, options }) => {
  return (
    <Tabs value={value} onChange={(_, value) => onChange(value)}>
      {options.map(({ id, nombre }) => (
        <Tab key={id} value={id} label={nombre} />
      ))}
    </Tabs>
  );
};

TabsReportes.defaultProps = {
  options: [],
  onChange: () => {},
};

export default TabsReportes;
