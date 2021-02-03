import React, { memo } from 'react';

import { Box } from '@chakra-ui/react';
import { FormField } from 'lib/FormField';
import Radio from './FormFields/Radio';
import Select from './FormFields/Select';
import TextInput from './FormFields/TextInput';

const Field: React.FC<FormField> = (props) => {
  let field;

  switch (props.elementType) {
    case 'radio':
      field = <Radio {...props} />;
      break;
    case 'input':
      field = <TextInput {...props} />;
      break;
    case 'select':
      field = <Select {...props} />;
      break;
    default:
      console.error(`Cannot handle elementType ${props.elementType}`);
      field = null;
      break;
  }

  return <Box p={1}>{field}</Box>;
};

export default memo(Field);
