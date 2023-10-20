export const PASTEL_REPORTE_CONFIGURACIONES = (data: number[]) => ({
  labels: ['Elementos sin incidencias activas', 'Elementos con incidencias activas'],
  datasets: [
    {
      data,
    },
  ],
});
