import { FC, ReactNode, useCallback } from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import { SxProps } from '@mui/material';

interface SelectProps {
  name: string;
  options: any[];
  label?: string;
  bindLabel?: string;
  bindValue?: string;
  title?: string;
  subtitle?: string;
  renderTitle?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  sx?: SxProps;
  containerSx?: SxProps;
  multi?: boolean;
  onChange: (value: any) => void;
  value: any;
  error?: boolean;
  helperText?: string;
  isHandleChange?: boolean;
}

const Select: FC<SelectProps> = ({
  name,
  options,
  label,
  bindLabel,
  bindValue,
  title,
  subtitle,
  required,
  disabled,
  sx,
  containerSx,
  multi,
  error,
  helperText,
  isHandleChange,
  value,
  onChange,
}) => {
  const handleChange = useCallback((event: SelectChangeEvent<unknown>) => {
    const { value } = event.target;
    if (isHandleChange) {
      onChange((prev) => ({ ...prev, [name]: value }));
      return;
    }

    onChange(value);
  }, [isHandleChange, onChange, name]);

  return (
    <Box sx={containerSx} display="flex" flexDirection="column" gap="4px">
      <Box display="flex" flexDirection="column">
        <Typography variant="body1">
          {`${title} ${required ? '*' : ''}`}{' '}
        </Typography>
        <Typography variant="caption">{subtitle}</Typography>
      </Box>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <MuiSelect
          sx={sx}
          label={label}
          disabled={disabled}
          size="small"
          value={value}
          multiple={multi}
          onChange={handleChange}
        >
          {options.map(
            ({ [bindLabel!]: label, [bindValue!]: value }, index) => (
              <MenuItem key={index} value={value}>
                {label}
              </MenuItem>
            )
          )}
        </MuiSelect>
        {error && (
          <FormHelperText>{helperText}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

Select.defaultProps = {
  bindLabel: 'nombre',
  bindValue: 'id',
  options: [],
  disabled: false,
  onChange: () => {}
};

export default Select;
