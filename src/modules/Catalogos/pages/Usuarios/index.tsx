import { FC, useCallback, useState } from 'react';

import Grid from '@mui/material/Grid';
import { Button, InputAdornment, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

import { useQuery } from 'react-query';

import Table, { Cabeceros } from '../../../../components/Table';
import TextField from '../../../../components/TextField';

import useDebounce from '../../../../utils/hooks/useDebounce';
import { Usuario } from '../../../../interfaces/Usuario';
import { obtenerUsuarios } from '../../services';
import { DEBOUNCE_TIME } from '../../../../constants/general';
import { TipoUsuario } from '../../../../interfaces/TipoUsuario';
import { useNavigate } from 'react-router-dom';

const cabeceros: Cabeceros<Usuario>[] = [
  {
    label: 'Usuario',
    key: 'username',
  },
  {
    label: 'Nombre',
    transform: ({ nombres, apellidoMat, apellidoPat }) => `${nombres} ${apellidoPat} ${apellidoMat}`
  },
  {
    label: 'Tipo',
    transform: ({ tipoUsuario }) => (tipoUsuario as TipoUsuario).nombre!,
  },
];

const Usuarios: FC = () => {
  const navigate = useNavigate();

  const [q, setQ] = useState<string>('');
  const debounceQ = useDebounce<string>(q, DEBOUNCE_TIME);

  const { data } = useQuery({
    queryFn: () => obtenerUsuarios(debounceQ),
    queryKey: [debounceQ],
    keepPreviousData: true,
    staleTime: 1000,
  });

  const handleAgregarClick = useCallback(() => {
    navigate('./formulario');
  }, [navigate]);

  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <Typography variant="h4">Usuarios</Typography>
      </Grid>
      <Grid
        item
        container
        xs={12}
        display="flex"
        justifyContent="space-between"
      >
        <Grid item xs={6}>
          <TextField
            placeholder="Buscar usuario"
            onTextChange={setQ}
            value={q}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-end">
          <Button onClick={handleAgregarClick}>Agregar usuario</Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Table cabeceros={cabeceros} rows={data?.docs} />
      </Grid>
    </Grid>
  );
};

export default Usuarios;
