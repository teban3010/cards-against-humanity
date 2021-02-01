import * as yup from 'yup';

export const formatInitValues = (formFields: any) =>
  Object.keys(formFields).reduce((acc: any, cur) => {
    if (typeof formFields[cur] === 'object' && formFields[cur] !== null) {
      acc[cur] =
        'elementType' in formFields[cur]
          ? formFields[cur].initialValue
          : formatValidations(cur);
    }

    return acc;
  }, {});

export const formatInitValuesWithData = (formFields: any, data: any) =>
  Object.keys(data).reduce((acc: any, cur) => {
    if (
      typeof data[cur] === 'object' &&
      data[cur] !== null &&
      typeof formFields[cur] === 'object' &&
      formFields[cur] !== null &&
      !('elementType' in formFields[cur])
    ) {
      acc[cur] = formatInitValuesWithData(formFields[cur], data[cur]);
    } else {
      acc[cur] = data[cur];
    }

    if (!data[cur] || Array.isArray(data[cur])) {
      return acc;
    }

    if (formFields && formFields[cur] && formFields[cur].type === 'datetime') {
      acc[cur] = new Date(data[cur]);
    }

    return acc;
  }, {});

export const formatValidations = (formFields: any) =>
  yup.object().shape(
    Object.keys(formFields).reduce((acc: any, cur) => {
      if (typeof formFields[cur] === 'object' && formFields[cur] !== null) {
        acc[cur] =
          'elementType' in formFields[cur]
            ? formFields[cur].validation
            : formatValidations(cur);
      }

      return acc;
    }, {})
  );
