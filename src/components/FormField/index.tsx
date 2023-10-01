import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { Box, SxProps, TextField, Typography } from '@mui/material';
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';

import { ENTER } from '../../constants/keycodes';

interface FormFieldProps {
  name: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'disabled' | 'setValueAs' | 'valueAsNumber' | 'valueAsDate'
  >;
  defaultValue?: number | string;
  label?: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  type?: 'text' | 'password' | 'number' | 'date';
  required?: boolean;
  flat?: boolean;
  flatPlaceholder?: (value: string, onDobleClick: () => void) => ReactNode;
  sx?: SxProps;
  maxRows?: number;
  rows?: number;
  multiline?: boolean;
}

const FormField: FC<FormFieldProps> = ({
  defaultValue,
  name,
  label,
  title,
  subtitle,
  placeholder,
  size,
  fullWidth,
  type,
  required,
  rules,
  flat,
  flatPlaceholder,
  sx,
  maxRows,
  multiline,
  rows,
}) => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();
  const watchValue = watch(name);

  const [isTextFieldVisible, setIsTextFieldVisible] = useState<boolean>(!flat);

  const textFieldRef = useRef<HTMLInputElement | null>(null);

  const handleDoubleClick = useCallback(() => {
    setIsTextFieldVisible(true);
  }, []);

  const handleKeyDown = useCallback((evt) => {
    if (!flat) return;
    const { keyCode } = evt;

    if (keyCode === ENTER) {
      setIsTextFieldVisible(false);
    }
  }, [flat]);

  const handleOnBlur = useCallback(() => {
    if (!flat) return;
    setIsTextFieldVisible(false);
  }, [flat]);

  useEffect(() => {
    if (isTextFieldVisible) textFieldRef.current?.focus();
  }, [isTextFieldVisible]);

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Box display="flex" flexDirection="column" gap="4px">
          <Box display="flex" flexDirection="column">
            <Typography variant="body1">
              {`${title} ${required ? '*' : ''}`}{' '}
            </Typography>
            <Typography variant="caption">{subtitle}</Typography>
          </Box>
          {flat &&
            !isTextFieldVisible &&
            flatPlaceholder &&
            flatPlaceholder(watchValue, handleDoubleClick)}
          {isTextFieldVisible && (
            <TextField
              {...field}
              inputRef={textFieldRef}
              label={label}
              placeholder={placeholder}
              helperText={errors[name]?.message as string}
              error={!!errors[name]}
              size={size}
              fullWidth={fullWidth}
              type={type}
              onKeyDown={handleKeyDown}
              onBlur={handleOnBlur}
              sx={sx}
              maxRows={maxRows}
              rows={rows}
              multiline={multiline}
            />
          )}
        </Box>
      )}
    />
  );
};

FormField.defaultProps = {
  rules: {},
  defaultValue: '',
  subtitle: '',
  title: '',
  type: 'text',
  required: false,
  rows: 1,
};

export default FormField;
