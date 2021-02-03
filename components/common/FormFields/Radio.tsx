import {
  Radio as CRadio,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import React, { memo } from 'react';

import { FormField } from 'lib/FormField';

const Radio: React.FC<FormField> = ({
  name,
  onChangeListener,
  label,
  disabled,
  helperText,
  keyPropName,
  displayPropName,
  options,
  row,
}) => (
  <Field name={name}>
    {({ field, meta, form }: FieldProps) => (
      <FormControl isInvalid={!!(meta.touched && meta.error)}>
        <FormLabel>{label}</FormLabel>
        <RadioGroup
          {...field}
          disabled={disabled ? disabled : false}
          onChange={(e: any) => {
            onChangeListener(e, field, form);
            field.onChange(e);
          }}>
          <Stack direction={row ? 'row' : 'column'}>
            {options && options.map((option) => (
              <CRadio key={option[keyPropName]} value={option[keyPropName]}>
                {option[displayPropName]}
              </CRadio>
            ))}
          </Stack>
        </RadioGroup>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        {!!(meta.touched && meta.error) && (
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        )}
      </FormControl>
    )}
  </Field>
);

export default memo(Radio);
