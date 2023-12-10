import { SxProps, styled } from '@mui/material';
import { FC, ReactNode } from 'react';

import { FormProvider, UseFormReturn } from 'react-hook-form';

export interface FormProps {
  methods: UseFormReturn<any>;
  children: ReactNode;
  onSubmit: (data: any) => void;
  sx?: SxProps;
}

const StyledForm = styled('form')({});

const Form: FC<FormProps> = ({ methods, children, onSubmit, sx }) => {
  return (
    <FormProvider {...methods}>
      <StyledForm sx={sx} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </StyledForm>
    </FormProvider>
  );
};

Form.defaultProps = {
  onSubmit: () => {},
};

export default Form;
