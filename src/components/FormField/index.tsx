import { FC } from "react";

import { Box, TextField, Typography } from "@mui/material";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

interface FormFieldProps {
  name: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"
  >;
  defaultValue?: number | string;
  label?: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  type?: "text" | "password" | "number" | "date";
}

const FormField: FC<FormFieldProps> = ({
  defaultValue,
  name,
  label,
  rules,
  title,
  subtitle,
  placeholder,
  size,
  fullWidth,
  type,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      control={control}
      render={({ field }) => (
        <Box display="flex" flexDirection="column" gap="4px">
          <Box display="flex" flexDirection="column">
            <Typography variant="body1">{title}</Typography>
            <Typography variant="caption">{subtitle}</Typography>
          </Box>
          <TextField
            {...field}
            label={label}
            placeholder={placeholder}
            helperText={errors[name]?.message as string}
            error={!!errors[name]}
            size={size}
            fullWidth={fullWidth}
            type={type}
          />
        </Box>
      )}
    />
  );
};

FormField.defaultProps = {
  rules: {},
  defaultValue: "",
  type: "text",
};

export default FormField;
