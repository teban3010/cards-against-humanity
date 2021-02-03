import { StackProps, VStack } from '@chakra-ui/react';

import React from 'react';

const Card: React.FC<StackProps> = ({ children, ...props }) => {
  return (
    <VStack
      bgColor="white"
      p={10}
      borderWidth="1px"
      borderRadius="md"
      shadow="md"
      {...props}>
      {children}
    </VStack>
  );
};

export default Card;
