import { useMemo } from 'react';
import { FieldValues, RegisterOptions } from 'react-hook-form';
import { CAMPO_REQUERIDO } from '../../constants/validaciones';

interface CommonRules {
  required?: boolean;
  isEmail?: boolean;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'disabled' | 'setValueAs' | 'valueAsNumber' | 'valueAsDate'
  >;
}

const useCommonControlRules = ({ rules, ...commonRules }: CommonRules) => {
  const computedRules = useMemo(() => {
    const newRules: any = {};
    if (commonRules.required) newRules.required = CAMPO_REQUERIDO;
    return { ...newRules, ...rules };
  }, [rules, commonRules]);

  return computedRules;
};

export default useCommonControlRules;
