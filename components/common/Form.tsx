import { Formik, Form as FormikForm } from 'formik';
import React, { useCallback, useMemo } from 'react';
import {
  formatInitValues,
  formatInitValuesWithData,
  formatValidations,
} from 'lib/formUtils';

import Button from './Button';
import { HStack } from '@chakra-ui/react';

export interface FormProps {
  data?: any;
  submitAction: (values: any) => void;
  cancelAction?: () => void;
  valuesMapper: (values: any) => any;
  formFields: any;
  initValues?: (values: any) => any;
  renderFields: (props) => React.ReactNode;
}

const Form: React.FC<FormProps> = ({
  data,
  submitAction,
  cancelAction,
  valuesMapper,
  formFields,
  initValues,
  renderFields,
}) => {
  const initialValues = useMemo(() => {
    const values = !data
      ? formatInitValues(formFields)
      : formatInitValuesWithData(formFields, data);

    return initValues ? initValues(values) : values;
  }, [formFields, data, initValues]);

  const validationSchema = useMemo(() => formatValidations(formFields), [
    formFields,
  ]);

  const onSubmitHandler = useCallback(
    async (values, actions) => {
      try {
        await submitAction(valuesMapper({ ...values }));
      } catch (error) {
        console.error(error);
      }

      actions.setSubmitting(false);
    },
    [submitAction, valuesMapper] // eslint-disable-line
  );

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmitHandler}>
      {({ isSubmitting, ...props }) => (
        <FormikForm data-cy-form>
          {renderFields(props)}

          <HStack p={1} marginTop={5} justify="center" align="center">
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            {cancelAction && (
              <Button
                type="reset"
                variant="outline"
                disabled={isSubmitting}
                onClick={cancelAction}>
                Cancel
              </Button>
            )}
          </HStack>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
