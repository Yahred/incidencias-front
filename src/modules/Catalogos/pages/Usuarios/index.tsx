import { FC } from 'react';

import Grid from '@mui/material/Grid';
import { Button, InputAdornment, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

import Table from '../../../../components/Table';
import TextField from '../../../../components/TextField';

const Usuarios: FC = () => {
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
        <Table />
      </Grid>
    </Grid>
  );
};

export default Usuarios;
