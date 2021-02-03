import {
  Select as CSelect,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import React, { memo } from 'react';

import { FormField } from 'lib/FormField';

const Select: React.FC<FormField> = ({
  name,
  onChangeListener,
  label,
  disabled,
  helperText,
  keyPropName,
  displayPropName,
  options,
}) => (
  <Field name={name}>
    {({ field, meta, form }: FieldProps) => (
      <FormControl
        id={`formControl-${name}`}
        isInvalid={!!(meta.touched && meta.error)}>
        <FormLabel htmlFor={`select-${name}`}>{label}</FormLabel>
        <CSelect
          {...field}
          id={`select-${name}`}
          onChange={(e) => {
            onChangeListener(e, field, form);
            field.onChange(e);
          }}
          disabled={disabled ? disabled : false}
          placeholder={`Select ${label}...`}>
          {options && options.map((o) => {
            <option value={o[keyPropName]}>{o[displayPropName]}</option>;
          })}
        </CSelect>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        {!!(meta.touched && meta.error) && (
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        )}
      </FormControl>
    )}
  </Field>
);

export default memo(Select);
