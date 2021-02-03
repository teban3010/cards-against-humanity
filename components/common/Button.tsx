import { ButtonProps, Button as CButton } from '@chakra-ui/react';

import React from 'react';

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <CButton colorScheme="blue" size="md" {...props}>
      {children}
    </CButton>
  );
};

export default Button;
