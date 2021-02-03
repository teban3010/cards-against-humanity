import { Heading, HeadingProps } from '@chakra-ui/react';

import React from 'react';

const H3: React.FC<HeadingProps> = ({ children, ...props }) => (
  <Heading as="h3" size="md" marginBottom={5} {...props}>
    {children}
  </Heading>
);

export default H3;
