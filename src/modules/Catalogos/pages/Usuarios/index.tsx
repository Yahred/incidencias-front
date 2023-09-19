import { FC, useMemo } from 'react';

import Grid from '@mui/material/Grid';
import { Button, InputAdornment, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

import Table, { Cabeceros } from '../../../../components/Table';
import TextField from '../../../../components/TextField';

const rows = [
  {
    username: 'Yahred',
    nombreCompleto: 'Yahred Gastelum',
    tipoUsuario: { nombre: 'Acádemico' },
  },
  {
    username: 'Jesus',
    nombreCompleto: 'Jesus Manjarrez',
    tipoUsuario: { nombre: 'Técnico' },
  }
]

const Usuarios: FC = () => {
  const cabeceros = useMemo<Cabeceros<any>[]>(() => [
    {
      label: 'Usuario',
      key: 'username'
    },
    {
      label: 'Nombre',
      key: 'nombreCompleto'
    },
    {
      label: 'Tipo',
      transform: ({ tipoUsuario }) => tipoUsuario?.nombre,
    },
  ], []);

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
          <Button>Agregar usuario</Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Table cabeceros={cabeceros} rows={rows} />
      </Grid>
    </Grid>
  );
};

export default Usuarios;
