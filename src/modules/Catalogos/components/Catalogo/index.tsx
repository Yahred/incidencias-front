import { FC, useCallback } from 'react';

import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import Search from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

import FadeIn from '../../../../components/FadeIn';
import Table, { Cabeceros } from '../../../../components/Table';
import TextField from '../../../../components/TextField';
import Paginador from '../../../../components/Paginador';

import useDebounce from '../../../../utils/hooks/useDebounce';
import { Paginado } from '../../../../interfaces/Paginado';
import { DEBOUNCE_TIME, ITEMS_POR_PAGINA } from '../../../../constants/general';

interface CatalogoProps {
  cabeceros: Cabeceros<any>[];
  title?: string;
  placeholderBusqueda?: string;
  agregarText?: string;
  queryFn: (q: string, pagina?: string) => Promise<Paginado<any>>;
}

const Catalogo: FC<CatalogoProps> = ({
  cabeceros,
  title,
  placeholderBusqueda,
  queryFn,
  agregarText,
}) => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const debounceQ = useDebounce<string>(
    searchParams.get('q') || '',
    DEBOUNCE_TIME
  );

  const { data } = useQuery({
    queryFn: () => queryFn(debounceQ, searchParams.get('pagina')!),
    queryKey: [debounceQ, searchParams.get('pagina')],
    keepPreviousData: true,
    staleTime: 1000,
  });

  const handleAgregarClick = useCallback(() => {
    navigate('./formulario');
  }, [navigate]);

  const handleSearchChange = useCallback(
    (q: string) => {
      setSearchParams({ q, pagina: '1' });
    },
    [setSearchParams]
  );

  const handlePaginaChange = useCallback(
    (_, page: number) => {
      setSearchParams({ q: searchParams.get('q')! , pagina: page.toString() });
    },
    [setSearchParams, searchParams]
  );

  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <Typography variant="h4">{title}</Typography>
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
            placeholder={placeholderBusqueda}
            onTextChange={handleSearchChange}
            value={searchParams.get('q') || ''}
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
          <Button onClick={handleAgregarClick}>{agregarText}</Button>
        </Grid>
      </Grid>
      <Grid item xs={12} minHeight={590}>
        <Table cabeceros={cabeceros} rows={data?.docs} />
      </Grid>
      <Grid item xs={12}>
        <FadeIn delay={350}>
          <Paginador
            onChange={handlePaginaChange}
            pagina={Number(searchParams.get('pagina')) || 1}
            itemsPorPagina={ITEMS_POR_PAGINA}
            totalPaginas={data?.totalPages || 1}
          />
        </FadeIn>
      </Grid>
    </Grid>
  );
};

export default Catalogo;
