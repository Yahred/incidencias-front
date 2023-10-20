import { Suspense, useMemo, useState } from 'react';

import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { Pie } from 'react-chartjs-2';

import Tabla, { Cabeceros } from '@components/Table';
import FiltrosConfiguracion from '../../components/FiltrosConfiguracion';
import Tarjeta from '../../components/Tarjeta';

import { IFiltrosConfiguracion } from '@interfaces/Reportes';
import { obtenerReporteConfiguraciones } from '@services';
import { TARJETAS_REPORTE_CONFIGURACIONES } from '@constants/reportes';
import { PASTEL_REPORTE_CONFIGURACIONES } from '@constants/graficas';

import usePagination from '@hooks/usePagination';
import Paginador from '@components/Paginador';
import { Recurso } from '@interfaces/Recurso';
import { Edificio } from '@interfaces/Edificio';
import { Modelo } from '@interfaces/Modelo';
import { Salon } from '@interfaces/Salon';
import { ITEMS_POR_PAGINA } from '@constants/general';

const cabeceros: Cabeceros<Recurso>[] = [
  {
    label: 'Recurso',
    key: 'nombre',
  },
  {
    label: 'Descripción',
    key: 'descripcion',
  },
  {
    label: 'Modelo',
    transform: ({ modelo }) => (modelo as Modelo)?.nombre,
  },
  {
    label: 'Salón',
    transform: ({ salon }) => (salon as Salon)?.nombre || '',
  },
  {
    label: 'Edificio',
    transform: ({ edificio }) => (edificio as Edificio)?.nombre || '',
  },
];

const ElementosConfiguracion = () => {
  const [filtros, setFiltros] = useState<IFiltrosConfiguracion>({});

  const tarjetas = useMemo(() => TARJETAS_REPORTE_CONFIGURACIONES, []);
  const [searchParams, setSearchParams] = useSearchParams({ pagina: '1' });

  const { handlePaginaChange, pagina } = usePagination(
    searchParams,
    setSearchParams
  );

  const { data: reporte, isLoading } = useQuery({
    queryKey: [
      'reporte',
      filtros.categoria,
      filtros.departamento,
      filtros.edificio,
      filtros.modelo,
    ],
    queryFn: () =>
      obtenerReporteConfiguraciones(filtros, pagina, ITEMS_POR_PAGINA),
    initialData: null,
  });

  const pastel = useMemo(() =>
    PASTEL_REPORTE_CONFIGURACIONES([
      (reporte?.numRecursos || 0) - (reporte?.numIncidencias || 0),
      reporte?.numIncidencias || 0,
  ]), [reporte]);

  return (
    <Suspense>
      <Stack direction="column" rowGap={2}>
        <FiltrosConfiguracion value={filtros} onChange={setFiltros} />
        <Grid container spacing={2}>
          <Grid item xs={12} lg={2}>
            <Stack direction={{ xs: 'row', lg: 'column' }} rowGap={2} gap={2}>
              {tarjetas.map((tarjeta, index) => (
                <Tarjeta
                  key={index}
                  isLoading={isLoading}
                  title={tarjeta.etiqueta}
                  value={reporte && reporte[tarjeta.propiedad]}
                />
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={4} lg={4} display={{ xs: 'flex' }} justifyContent={{ xs: 'center' }} maxHeight={360}>
            <Pie data={pastel} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Tabla cabeceros={cabeceros} rows={reporte?.recursos} />
            <Paginador
              totalPaginas={reporte?.totalPages || 0}
              pagina={pagina}
              onChange={handlePaginaChange}
            />
          </Grid>
        </Grid>
      </Stack>
    </Suspense>
  );
};

export default ElementosConfiguracion;
