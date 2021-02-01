import { Heading, HeadingProps } from '@chakra-ui/react';

import React from 'react';

const H2: React.FC<HeadingProps> = ({ children, ...props }) => (
  <Heading as="h2" marginBottom={5} {...props}>
    {children}
  </Heading>
);

export default H2;
