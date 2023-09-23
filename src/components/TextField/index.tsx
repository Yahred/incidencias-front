import { FC, useCallback } from "react";

import MuiTextField from '@mui/material/TextField';
import { FilledInputProps, InputProps, OutlinedInputProps, SxProps } from "@mui/material";

interface TextFieldProps {
  sx?: SxProps
  onTextChange?: (text: string) => void
  size?: 'medium' | 'small'
  placeholder?: string
  value: string
  InputProps?: Partial<FilledInputProps> | Partial<OutlinedInputProps> | Partial<InputProps>
}

const TextField: FC<TextFieldProps> = ({
  onTextChange,
  sx,
  size,
  placeholder,
  InputProps,
  value
}) => {
  const onChange = useCallback((event: any) => {
    const { target: { value } } = event;

    onTextChange!(value);
  }, [onTextChange]);

  return <MuiTextField
    sx={sx}
    value={value}
    onChange={onChange}
    size={size}
    placeholder={placeholder}
    InputProps={InputProps}
  />
}

TextField.defaultProps = {
  onTextChange: () => { }
}

export default TextField;
