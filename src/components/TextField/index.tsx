import { FC, useCallback } from 'react';

import MuiTextField from '@mui/material/TextField';
import {
  Box,
  FilledInputProps,
  InputProps,
  OutlinedInputProps,
  SxProps,
  Typography,
} from '@mui/material';

interface TextFieldProps {
  sx?: SxProps;
  onTextChange?: (text: string) => void;
  size?: 'medium' | 'small';
  placeholder?: string;
  value: string;
  InputProps?:
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>
    | Partial<InputProps>;
  required?: boolean;
  title?: string;
  subtitle?: string;
  fullWidth?: boolean;
  type?: 'text' | 'password' | 'number' | 'date';
  label?: string;
  error?: boolean;
  helperText?: string;
  isHandleChange?: boolean;
  onChange?: (prevState: object) => void;
  name?: string;
}

const TextField: FC<TextFieldProps> = ({
  onTextChange,
  sx,
  size,
  placeholder,
  InputProps,
  value,
  required,
  subtitle,
  title,
  fullWidth,
  type,
  label,
  error,
  helperText,
  isHandleChange,
  onChange,
  name,
}) => {
  const handleChange = useCallback((event: any) => {
    const {
      target: { value },
    } = event;
    if (isHandleChange && onChange) onChange((prev) => ({...prev, [name!]: value }));
    else onTextChange!(value);
  }, [onTextChange, isHandleChange, name, onChange]);

  return (
    <Box display="flex" flexDirection="column" gap="4px" justifyContent='flex-end'>
      <Box display="flex" flexDirection="column">
        <Typography variant="body1">
          {`${title || ''} ${required ? '*' : ''}`}{' '}
        </Typography>
        <Typography variant="caption">{subtitle}</Typography>
      </Box>
      <MuiTextField
        label={label}
        placeholder={placeholder}
        helperText={helperText}
        error={error}
        size={size}
        fullWidth={fullWidth}
        type={type}
        value={value}
        onChange={handleChange}
        InputProps={InputProps}
        sx={sx}
      />
    </Box>
  );
};

TextField.defaultProps = {
  onTextChange: () => {},
  isHandleChange: false,
  onChange: () => {}
};

export default TextField;
