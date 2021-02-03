import { Heading, HeadingProps } from '@chakra-ui/react';

import React from 'react';

const H1: React.FC<HeadingProps> = ({ children, ...props }) => (
  <Heading as="h1" marginBottom={5} {...props}>
    {children}
  </Heading>
);

export default H1;
