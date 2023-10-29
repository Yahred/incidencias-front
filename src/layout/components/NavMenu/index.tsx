import { Box, Button } from '@mui/material';
import { FC, useCallback, useEffect, useRef } from 'react';
import { APPBAR_MENU_ITEMS } from '../../../constants/menu';
import AnimatedBar from '../../../components/AnimatedBar';

interface NavMenuProps {
  onClick: (ruta: string) => void;
  moduloSeleccionado: string;
}

const NavMenu: FC<NavMenuProps> = ({ onClick, moduloSeleccionado }) => {
  const barRef = useRef<HTMLDivElement | null>(null);
  const selectedRef = useRef<HTMLDivElement | null>(null);

  const handleButtonClick = useCallback(
    (ruta: string) => {
      return () => {
        onClick(ruta);
      };
    },
    [onClick]
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
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        gap: { lg: '4px', xs: '8px' },
        maxWidth: '100%',
        overflowX: 'auto',
      }}
    >
      <AnimatedBar ref={barRef} />

      {APPBAR_MENU_ITEMS.map((item) =>
        item.ruta === moduloSeleccionado ? (
          <Box
            ref={selectedRef}
            key={item.clave}
            sx={{
              height: '100%',
              display: 'grid',
              placeItems: 'center',
              whiteSpace: 'nowrap',
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
              whiteSpace: 'nowrap',
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
  );
};

export default NavMenu;