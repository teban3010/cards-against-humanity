import { Center, CircularProgress } from '@chakra-ui/react';

import React from 'react';

const Loading = () => {
  return (
    <Center h="100%">
      <CircularProgress color="white" isIndeterminate />
    </Center>
  );
};

export default Loading;
