import { FC } from 'react';

import TextField from '@components/TextField';

import { Caracteristica } from '../../../../interfaces/Categoria';
import { CaracteristicaModelo } from '../../../../interfaces/Modelo';

interface FormularioCaracteristicasModeloProps {
  caracteristicas: Caracteristica[];
  onChange: (formulario: CaracteristicaModelo[]) => void;
  value: CaracteristicaModelo[];
}

const FormularioCaracteristicasModelo: FC<
  FormularioCaracteristicasModeloProps
> = ({ caracteristicas, onChange, value }) => {
  const handleChange = (
    index: number,
    caracteristica: Caracteristica,
    valor: string
  ) => {
    const nuevo = Object.values({
      ...value,
      [index]: {
        valor,
        nombre: caracteristica.nombre,
        unidad: caracteristica.unidad,
      },
    }) as CaracteristicaModelo[];
    onChange(nuevo);
  };

  return caracteristicas.map((caracteristica, index) => (
    <TextField
      key={index}
      value={value[index]?.valor || ''}
      title={caracteristica?.nombre}
      subtitle={caracteristica?.unidad}
      required={caracteristica.requerida}
      onTextChange={(valor: string) =>
        handleChange(index, caracteristica, valor)
      }
    />
  ));
};

export default FormularioCaracteristicasModelo;
