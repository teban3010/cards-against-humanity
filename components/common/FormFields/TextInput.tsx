import { Field, FieldProps } from 'formik';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React, { memo } from 'react';

import { FormField } from 'lib/FormField';

const TextInput: React.FC<FormField> = ({
  name,
  onChangeListener,
  label,
  disabled,
  helperText,
}) => (
  <Field name={name}>
    {({ field, meta, form }: FieldProps) => (
      <FormControl
        id={`formControl-${name}`}
        isInvalid={!!(meta.touched && meta.error)}>
        <FormLabel htmlFor={`input-${name}`}>{label}</FormLabel>
        <Input
          {...field}
          id={`input-${name}`}
          variant="flushed"
          onChange={(e) => {
            onChangeListener(e, field, form);
            field.onChange(e);
          }}
          disabled={disabled ? disabled : false}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        {!!(meta.touched && meta.error) && (
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        )}
      </FormControl>
    )}
  </Field>
);

export default memo(TextInput);
