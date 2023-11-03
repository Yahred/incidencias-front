const formatearDuracion = (duracion: number) =>
  duracion === 0.5
    ? 'Media hora'
    : `${duracion} ${duracion > 1 ? 'horas' : 'hora'}`;

export default formatearDuracion;
