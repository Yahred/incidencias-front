import { FC, ReactNode } from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import useCommonControlRules from '../../utils/hooks/useControlRules';

interface FormSelectProps {
  name: string;
  options: any[];
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'disabled' | 'setValueAs' | 'valueAsNumber' | 'valueAsDate'
  >;
  label?: string;
  defaultValue?: number | string;
  bindLabel?: string;
  bindValue?: string;
  title?: string;
  subtitle?: string;
  renderTitle?: ReactNode;
  required?: boolean;
}

const FormSelect: FC<FormSelectProps> = ({
  name,
  options,
  rules,
  label,
  defaultValue,
  bindLabel,
  bindValue,
  title,
  subtitle,
  required,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const computedRules = useCommonControlRules({ rules, required });

  return (
    <Controller
      name={name}
      rules={computedRules}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Box display="flex" flexDirection="column" gap="4px">
          <Box display="flex" flexDirection="column">
            <Typography variant="body1">
              {`${title} ${required ? '*' : ''}`}{' '}
            </Typography>
            <Typography variant="caption">{subtitle}</Typography>
          </Box>
          <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
              {...field}
              error={!!errors[name]}
              label={label}
              size="small"
            >
              {options.map(
                ({ [bindLabel!]: label, [bindValue!]: value }, index) => (
                  <MenuItem key={index} value={value}>
                    {label}
                  </MenuItem>
                )
              )}
            </Select>
            {!!errors[name] && (
              <FormHelperText >
                {(errors[name] as any)?.message}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
      )}
    />
  );
};

FormSelect.defaultProps = {
  bindLabel: 'nombre',
  bindValue: 'id',
  options: [],
  defaultValue: '',
};

export default FormSelect;
